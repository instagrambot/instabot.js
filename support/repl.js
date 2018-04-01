import WebApi from '@/lib/web-api';

if (process.env.NODE_ENV !== 'production') {
  window.$instabot = {
    api: new WebApi(),
  };
}
