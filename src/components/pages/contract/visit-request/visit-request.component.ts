import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { VisitRequestService } from '../../../../services/visit-request.service';

@Component({
  selector: 'app-visit-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visit-request.component.html',
  styleUrl: './visit-request.component.css',
})
export class VisitRequestComponent {
  constructor(
    private user: UserService,
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
    this.user.getUser(this.userID).subscribe({
      next: (res: any) => {
        this.userData = res;
        if (res.visit_requests.length !== 0) {
          this.responseMessage = `You have a visit request already registered and you will be contacted within 24 hours of submitting the request.`;
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
                this.responseMessage = `A visit request has been submitted with the number ${
                  res.id + 10000
                }, and you will be contacted within 24 hours.`;
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
