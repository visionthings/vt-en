import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { VisitRequestService } from '../../../../services/visit-request.service';

@Component({
  selector: 'app-visit-complete',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './visit-complete.component.html',
  styleUrl: './visit-complete.component.css',
})
export class VisitCompleteComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private visitRequest: VisitRequestService
  ) {}

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Send visit request
  userID = typeof window !== 'undefined' && localStorage.getItem('id');
  userData: any = null;
  responseMessage: string | null = null;

  ngOnInit(): void {
    this.authService.getUser(this.userID).subscribe({
      next: (res: any) => {
        this.userData = res;

        this.visitRequest
          .sendVisitRequest({
            user_id: this.userData.id,
            name: this.userData.name,
            phone: this.userData.phone,
            email: this.userData.email,
          })
          .subscribe({
            next: (res: any) => {
              console.log(res);
              this.responseMessage = `تم تقديم طلب زيارة برقم ${
                res.id + 10000
              }، وسيتم الاتصال بك في خلال 24 ساعة.`;
            },
            error: (err) => {
              console.log(err);
            },
          });
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
