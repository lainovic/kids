self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: "./assets/notification.png",
    };
    event.waitUntil(
      self.registration.showNotification('Kids', options)
    );
  });