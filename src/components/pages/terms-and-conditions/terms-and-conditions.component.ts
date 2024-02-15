import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css',
})
export class TermsAndConditionsComponent {
  terms: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      id: 1,
      icon: 'assets/images/terms_and_conditions/1.png',
      title: `الخدمات`,
      description: `الخدمات نحن نقدم خدمات تركيب وصيانة كاميرات المراقبة للأفراد والشركات وفقا للعقود المبرمة معنا. يمكنك طلب خدمتنا عن طريق إنشاء عقد جديد على الموقع أو طلب زيارة من فريقنا. نحن نضمن جودة خدمتنا وضمان كاميرات المراقبة لمدة سنة واحدة من تاريخ التركيب.`,
    },
    {
      id: 2,
      icon: 'assets/images/terms_and_conditions/2.png',
      title: `المسئولية`,
      description: `المسؤلية نحن نتحمل المسؤولية عن أي خسارة أو ضرر ناجم عن خطأ أو تقصير من جانبنا أو فريقنا أثناء تقديم الخدمة. ولكن نحن لا نتحمل المسؤولية عن أي خسارة أو ضرر ناجم عن سوء استخدام أو تدخل غير مصرح به أو عوامل خارجة عن سيطرتنا. كما أننا لا نتحمل المسؤولية عن أي محتوى أو بيانات يتم تسجيلها أو نقلها أو حفظها بواسطة كاميرات المراقبة. عليك أن تحترم قوانين حماية الخصوصية وحقوق الآخرين عند استخدام كاميرات المراقبة.`,
    },
    {
      id: 3,
      icon: 'assets/images/terms_and_conditions/3.png',
      title: `الملكية الفكرية`,
      description: `جميع حقوق الملكية الفكرية في هذا الموقع ومحتواه تخضع للحماية القانونية وتنتمي إلينا أو إلى مرخصينا. لا يجوز لك نسخ أو تعديل أو توزيع أو نشر أو عرض أو استخدام أو إعادة إنتاج أو نقل أو بيع أو إنشاء أعمال مشتقة من أي جزء من هذا الموقع أو محتواه دون الحصول على إذن خطي منا أو من مرخصينا.`,
    },
  ];
}
