import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitRequestService } from '../../../../services/visit-request.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-visit-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-request.component.html',
  styleUrl: './visit-request.component.css',
})
export class VisitRequestComponent {
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

  sendVisitRequest() {
    this.authService.getUser(this.userID).subscribe({
      next: (res: any) => {
        this.userData = res;
        if (res.visit_requests.length !== 0) {
          this.responseMessage = `لديك طلب زيارة مسجل بالفعل وسيتم الاتصال بك في خلال 24 ساعة من وقت تقديم الطلب.`;
        } else {
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
        }
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
