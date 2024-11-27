import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as ngrok from 'ngrok';

@Injectable()
export class NgrokService implements OnModuleInit, OnModuleDestroy {
  private ngrokUrl: string;

  // Automatically start ngrok when the module is initialized
  async onModuleInit() {
    const port = parseInt(process.env.PORT || '3000', 10);
    this.ngrokUrl = await ngrok.connect(port); // Start Ngrok on the given port
    console.log(`Ngrok tunnel started at: ${this.ngrokUrl}`);
  }

  // Get the current Ngrok URL
  getNgrokUrl(): string {
    if (!this.ngrokUrl) {
      throw new Error('Ngrok tunnel not started');
    }
    return this.ngrokUrl;
  }

  // Stop ngrok tunnel when the module is destroyed (to clean up)
  async onModuleDestroy() {
    if (this.ngrokUrl) {
      await ngrok.disconnect();
      console.log('Ngrok tunnel closed');
    }
  }
}
