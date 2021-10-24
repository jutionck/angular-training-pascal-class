import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private readonly storage: Storage = sessionStorage;

  /**
   * Kita akan membuat sebuah session service misalnya Flash
   * Dimana ketika set maka akan masuk ke session stroage, 
   * ketika get setelah return maka value-nya hilang dari session
   */

  public getFlash(): string {
    const message: string = this.storage.getItem('flash') as string;
    // ketika sudah get maka hapus key nya
    this.storage.removeItem('flash');
    return message;
  }

  public setFlash(value: string): void {
    this.storage.setItem('flash', value);
  }

}
