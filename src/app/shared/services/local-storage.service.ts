import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  updateItem(key: string, newArray: any[]): void {
    const currentArray = this.getItem(key) || [];
    const mergedArray = [...newArray, ...currentArray];

    const distinctArray = Array.from(
      new Set(mergedArray.map((item) => item.dataId))
    ).map((dataId) => mergedArray.find((item) => item.dataId === dataId));
    console.log(distinctArray);

    this.setItem(key, distinctArray);
  }
}
