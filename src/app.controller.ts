import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get('/health')
  getHealthCheck() {
    return {
      statusCode: 200,
      message: 'Welcome To Todo API :)'
    };
  }
}
