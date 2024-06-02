import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  information: {
    id: number;
    icon: string;
    title: string;
    desciption: string;
  }[] = [
    {
      id: 1,
      icon: 'assets/images/privacy_policy/info_1.png',
      title: `Personal Information`,
      desciption: ` includes your name, email address, phone number, and any other information you voluntarily provide to us when you contact us, register an account, place an order, or subscribe to our newsletter.`,
    },
    {
      id: 2,
      icon: 'assets/images/privacy_policy/info_2.png',
      title: `Technical Information`,
      desciption: `Includes your IP address, browser type, device type, operating system, and other information we automatically collect when you access our website through cookies or other tracking technologies.`,
    },
    {
      id: 3,
      icon: 'assets/images/privacy_policy/info_3.png',
      title: `Usage`,
      desciption: `Includes your browsing history, search queries, preferences, and other information we collect when you interact with our website or products and services.`,
    },
  ];

  policies = [
    {
      id: 1,
      icon: 'assets/images/privacy_policy/1.png',
      title: `How do we use your information?`,
      description: `We may use your information for the following purposes:`,
      points: [
        `To provide you with our products and services, process your orders, deliver your products, and communicate with you regarding your orders and transactions.`,
        `To improve our site, products, and services, and to tailor your experience on our site to your interests and preferences.`,
        `To send you marketing and promotional emails, newsletters and other communications about our products, services, offers and events, if you have agreed to receive them.`,
        `To respond to your inquiries, comments, complaints, or support requests.`,
        `To protect our website, products, and services, and to prevent, detect, and investigate fraud, security breaches, or other illegal or unauthorized activity.`,
        `To comply with our legal obligations, enforce our terms and conditions, and protect our rights and interests.`,
      ],
    },
    {
      id: 2,
      icon: 'assets/images/privacy_policy/2.png',
      title: `How do we share your information?`,
      description: 'We may share your information with the following parties:',
      points: [
        `Service Providers: These are third-party companies that help us with our business operations, such as hosting, payment processing, delivery, analytics, marketing, and customer service. We only share your information with service providers that we trust and who have agreed to protect your information in accordance with this policy and applicable laws.`,
        `Affiliates: These are our subsidiaries, parent companies or other related entities that are under common control with us. We may share your information with our affiliates for internal business purposes, such as administration, management, and product development.`,
        `Business Partners: These are third-party companies with whom we partner to offer you products, services or promotions that may be of interest to you. We may not share your information with our business partners unless you consent to receive such communications from them or from us.`,
        `Law Enforcement and Regulators: These are government authorities or other entities that have the ability to request or compel us to disclose your information for legal or regulatory purposes. We may share your information with law enforcement and regulatory authorities if we believe it is necessary or appropriate to do so, or if we are required to do so by law.`,
      ],
    },
    {
      id: 3,
      icon: 'assets/images/privacy_policy/3.png',
      title: `How do we protect your information?`,
      description: ``,
      points: [
        `We take reasonable measures to protect your information from unauthorized access, use, disclosure, alteration or destruction. We use technical, administrative, and physical safeguards, such as encryption, firewalls, passwords, and access controls, to secure your information. However, we cannot guarantee that your information is completely secure from hackers, cyber-attacks or other threats, and you use our website, products and services at your own risk.`,
      ],
    },
    {
      id: 4,
      icon: 'assets/images/privacy_policy/4.png',
      title: `How do we use cookies and other tracking technologies?`,
      description: ``,
      points: [
        `We use cookies and other tracking technologies, such as web beacons, pixels and tags, to collect and store information about your visit and use of our website, products and services. Cookies are small text files that are placed on your browser or device by websites you visit. They help us remember your preferences, enhance your user experience, measure and analyze the performance of our website, and deliver relevant advertising to you.`,
      ],
    },
    {
      id: 5,
      icon: 'assets/images/privacy_policy/5.png',
      title: `How do we update this policy?`,
      description: ``,
      points: [
        `We may update this policy from time to time to reflect changes in our practices, technology or legal requirements. We will notify you of any material changes by posting a notice on our website, or by sending you an email, if we have your contact details. The date it was last updated will be indicated at the top of this policy. We encourage you to review this policy periodically to stay informed about how we handle your information.`,
      ],
    },
  ];
}
