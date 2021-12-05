import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { getCartTotal } from 'src/app/constants';
import { Address, ManageAddressParams } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { ActionConfirmDialogComponent } from '../../dialogs/action-confirm-dialog/action-confirm-dialog.component';
import { ManageAddressDialogComponent } from '../../dialogs/manage-address-dialog/manage-address-dialog.component';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  addresses$: Observable<Address[]>;
  orderTotal: number = 0;
  selectedAddress?: Address;
  dialogRef: any = null;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.cart$ = this.cartService.cart$.pipe(
      map((cart: Cart) => {
        this.orderTotal = getCartTotal(cart?.productData!);
        return cart;
      })
    );

    this.addresses$ = this.addressService.address$;
  }

  ngOnInit(): void {
    this.addressService.getAddressesForUser().subscribe({
      next: (res: boolean) => {
        if (!res) {
          this.toastrService.error(
            'Failed to load delivery addresses.',
            'Something went wrong. Try again!'
          );
        }
      },
      error: (err) => {
        this.toastrService.error(err, 'Something went wrong. Try again!');
      },
    });
  }

  get isMobileDisplay() {
    return window.screen.width <= 576;
  }

  setSelectedAddress(address: Address) {
    this.selectedAddress = address;
  }

  showManageAddressDialog(action: string, address?: Address) {
    this.dialogRef = this.dialog.open(ManageAddressDialogComponent, {
      width: '600px',
      closeOnNavigation: true,
      data: {
        action,
        address,
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((params: ManageAddressParams) => {
          if (params) {
            this.spinner.show();
            if (action === 'add') {
              return this.addressService.addNewAddress(params);
            } else {
              return this.addressService.editUserAddress({
                ...params,
                _id: address?._id,
              });
            }
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success(
              `Address ${action === 'add' ? 'added' : 'updated'} successfully!`
            );
          } else {
            this.toastrService.error(
              `Failed to ${action === 'add' ? 'add' : 'update'} address.`,
              'Something went wrong. Try agiain!'
            );
          }
        },
        error: (err: any) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong. Try agiain!');
        },
      });
  }

  addNewAddress() {
    this.showManageAddressDialog('add');
  }

  editUserAddress() {
    this.showManageAddressDialog('edit', this.selectedAddress);
  }

  deleteDeliveryAddress() {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm delete delivery address`,
        messageLine1: `Are you sure you want to delete the address. This cannot be undone.`,
        successText: 'Delete Address',
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res: boolean) => {
          if (res) {
            return this.addressService.removeUserAddress(
              this.selectedAddress?._id!
            );
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.toastrService.success(
              'Delivery address removed successfully!'
            );
          } else {
            this.toastrService.error(
              'Failed to delete delivery address.',
              'Something went wrong. Try again!'
            );
          }
        },
        error: (err: any) => {
          this.toastrService.error(err, 'Something went wrong. Try again!');
        },
      });
  }
}
