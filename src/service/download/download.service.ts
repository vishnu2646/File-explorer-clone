import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
    private http = inject(HttpClient)

    public downloadFile(fileUrl: string) {
        return this.http.get(fileUrl, { responseType: 'blob' });
    }
}
