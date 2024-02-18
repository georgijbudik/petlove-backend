import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PetLove API')
  .addServer('https://pet-management.onrender.com/api/v1')
  .setDescription(
    'PetLove backend created by Ivan Nedokhodiuk and Georgii Budik',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
