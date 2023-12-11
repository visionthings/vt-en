/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // App
    "./src/app/app.component.html",
    "./src/app/app.component.ts",

    // Navbar
    "./src/components/navbar/navbar.component.html",
    "./src/components/navbar/navbar.component.ts",

    //***** [ HOME PAGE ] *****\\

    // Header
    "./src/components/pages/home/header/header.component.html",
    "./src/components/pages/home/header/header.component.ts",

    // About company
    "./src/components/pages/home/about-company/about-company.component.html",
    "./src/components/pages/home/about-company/about-company.component.ts",

    // Our services
    "./src/components/pages/home/our-services/our-services.component.html",
    "./src/components/pages/home/our-services/our-services.component.ts",

    // How to install
    "./src/components/pages/home/how-to-install/how-to-install.component.html",
    "./src/components/pages/home/how-to-install/how-to-install.component.ts",

    // Why choose
    "./src/components/pages/home/why-choose/why-choose.component.html",
    "./src/components/pages/home/why-choose/why-choose.component.ts",

    // ***** [ ABOUT US ] ***** \\

    // Header
    "./src/components/pages/about-us/about-header/about-header.component.html",
    "./src/components/pages/about-us/about-header/about-header.component.ts",

    // Our vision
    "./src/components/pages/about-us/our-vision/our-vision.component.html",
    "./src/components/pages/about-us/our-vision/our-vision.component.ts",

    // Company values
    "./src/components/pages/about-us/our-vision/our-vision.component.html",
    "./src/components/pages/about-us/our-vision/our-vision.component.ts",

    // ***** [ CONTACT US ] ***** \\
    "./src/components/pages/contact-us/contact-us.component.html",
    "./src/components/pages/contact-us/contact-us.component.ts",

    // ***** [ CONTRACT ] ***** \\
    "./src/components/pages/contract/contract.component.html",
    "./src/components/pages/contract/contract.component.ts",

    // Create new contract
    "./src/components/pages/contract/create-new-contract/create-new-contract.component.html",
    "./src/components/pages/contract/create-new-contract/create-new-contract.component.ts",

    // Payment
    "./src/components/pages/contract/payment/payment.component.html",
    "./src/components/pages/contract/payment/payment.component.ts",

    // Payment redirect
    "./src/components/pages/contract/payment-redirect/payment-redirect.component.html",
    "./src/components/pages/contract/payment-redirect/payment-redirect.component.ts",

    // Final contract
    "./src/components/pages/contract/final-contract/final-contract.component.html",
    "./src/components/pages/contract/final-contract/final-contract.component.ts",

    // Contract pdf
    "./src/components/pages/contract/contract-pdf/contract-pdf.component.html",
    "./src/components/pages/contract/contract-pdf/contract-pdf.component.ts",

    // Registered contracts
    "./src/components/pages/contract/registered-contracts/registered-contracts.component.html",
    "./src/components/pages/contract/registered-contracts/registered-contracts.component.ts",

    // Visit request
    "./src/components/pages/contract/visit-request/visit-request.component.html",
    "./src/components/pages/contract/visit-request/visit-request.component.ts",

    // ***** [ TERMS & CONDITIONS ] ***** \\
    "./src/components/pages/terms-and-conditions/terms-and-conditions.component.html",
    "./src/components/pages/terms-and-conditions/terms-and-conditions.component.ts",

    // ***** [ PRIVACY POLICY ] ***** \\

    "./src/components/pages/privacy-policy/privacy-policy.component.html",
    "./src/components/pages/privacy-policy/privacy-policy.component.ts",

    // ***** [ RETURN POLICY ] ***** \\
    "./src/components/pages/return-policy/return-policy.component.html",
    "./src/components/pages/return-policy/return-policy.component.ts",

    // ***** [ SIGN-IN ] ***** \\
    "./src/components/pages/sign-in/sign-in.component.html",
    "./src/components/pages/sign-in/sign-in.component.ts",

    // ***** [ SIGN-IN-REDIRECT ] ***** \\
    "./src/components/pages/sign-in-redirect/sign-in-redirect.component.html",
    "./src/components/pages/sign-in-redirect/sign-in-redirect.component.ts",

    // ***** [ SIGN-UP ] ***** \\
    "./src/components/pages/sign-up/sign-up.component.html",
    "./src/components/pages/sign-up/sign-up.component.ts",

    // ***** [ ACCOUNT ] ***** \\
    "./src/components/pages/account/account.component.html",
    "./src/components/pages/account/account.component.ts",

    // ***** [ PERSONAL-INFORMATION ] ***** \\
    "./src/components/pages/account/personal-information/personal-information.component.html",
    "./src/components/pages/account/personal-information/personal-information.component.ts",

    // ***** [ CHANGE-PASSWORD ] ***** \\
    "./src/components/pages/account/change-password/change-password.component.html",
    "./src/components/pages/account/change-password/change-password.component.ts",

    // ***** [ SIGN-OUT ] ***** \\
    "./src/components/pages/account/sign-out/sign-out.component.html",
    "./src/components/pages/account/sign-out/sign-out.component.ts",

    // Footer
    "./src/components/footer/footer.component.html",
    "./src/components/footer/footer.component.ts",

    // Custom
    "./src/components/custom/green-button/green-button.component.html",
    "./src/components/custom/green-button/green-button.component.ts",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 3s linear infinite",
        "ping-slow": "ping 2s linear infinite",
      },
    },
    container: {
      padding: "1rem",
      center: true,
    },
  },
  plugins: [],
};
