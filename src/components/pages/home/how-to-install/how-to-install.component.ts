import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-how-to-install',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './how-to-install.component.html',
  styleUrl: './how-to-install.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HowToInstallComponent {
  steps: {
    id: number;
    content: string;
    imageUrl: string;
  }[] = [
    {
      id: 1,
      content: `First, you need to decide how many cameras you need and where you want to put them. You should cover the most vulnerable areas of your property, such as the front door, back door, windows, garage, etc. You can also use a video doorbell for your front door, which can alert you when someone approaches or rings the bell. You can also use indoor cameras to monitor specific rooms or areas within your home.`,
      imageUrl: 'assets/images/how_to_install/1.png',
    },
    {
      id: 2,
      content: `Secondly, you have to choose the type of cameras and system you want. There are wired and wireless options, as well as analog and digital options. Wired cameras require connecting cables from each camera to a central DVR (digital video recorder) or NVR (network video recorder) box, which stores the footage and allows you to access it remotely. Wireless cameras use Wi-Fi or cellular signals to transfer footage to a cloud service or local storage device. Analog cameras use BNC cables and ballasts (converters that convert analog signals into digital signals) to connect to a DVR box. Digital cameras use Ethernet or Wi-Fi cables to connect to the NVR box or cloud service.`,
      imageUrl: 'assets/images/how_to_install/2.png',
    },
    {
      id: 3,
      content: `Third, you need to prepare the camera installation. You should plan the cable route (if using wired cameras) and make sure you have enough length and connectors for each camera. You should also check the power supply and internet connection for each camera. You may need to drill holes in walls or ceilings to run cables or install cameras. You should also mark the area where you want to mount each camera with a pencil and pre-drill holes if necessary.`,
      imageUrl: 'assets/images/how_to_install/3.png',
    },
    {
      id: 4,
      content: `Fourth, you need to install the cameras and connect them to your DVR or NVR (if using wired cameras) or to your Wi-Fi network (if using wireless cameras). You must follow the instructions included with your camera system and use the mounting brackets and screws provided. You should also adjust the angle and position of each camera to get the best view of the area you want to monitor. You should also test each camera to make sure it is working properly and sending clear images and sound.`,
      imageUrl: 'assets/images/how_to_install/4.png',
    },
    {
      id: 5,
      content: `Fifth, you need to set up the user interface for your camera system. You must connect your DVR or NVR to a monitor, mouse, and keyboard, or use a smartphone app or web browser to access your camera system remotely. You should follow the instructions that came with your camera system and set up your account and password, network settings, recording settings, motion detection settings, alerts settings, etc. You should also review your snapshots regularly and delete any unnecessary files to free up space.`,
      imageUrl: 'assets/images/how_to_install/5.png',
    },
  ];
}
