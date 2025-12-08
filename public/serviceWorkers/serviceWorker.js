const CACHE_VERSION = "cache_v1";


const preCache = () => {
  return caches.open(CACHE_VERSION).then(
    (cache) => {
      return cache.addAll([
        "/index.html",
        "/static/js/bundle.js", 
        "/static/js/main.js",
        "/static/css/main.css",
      ]);
    },
    (error) => {
      console.log(`preCache error: ${error}`);
    }
  );
};

const clearCache = () => {
  console.log("activate");
  return caches.keys().then((cacheKeysArray) => {
    return Promise.all(
      cacheKeysArray.map((key) => {
        if (key !== CACHE_VERSION) {
          return caches.delete(key);
        }
      })
    );
  });
};

const tryNetwork = (request) => {
  console.log(`Request url: ${request.url}`);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error("Network timeout")),
      400
    );
    fetch(request).then((result) => {
      clearTimeout(timeoutId);
      const responseClone = result.clone();
      // console.log(request.url.startsWith(API_BASE_URL))
      // if (!request.url.startsWith(API_BASE_URL)) {
      //   resolve(result)
      //   return
      // }
      // console.log(request.url.startsWith(API_BASE_URL))
      // if (request.url.startsWith("http://localhost:3000/src/components/Profile")) {
      //   resolve(result)
      //   return
      // }
      caches.open(CACHE_VERSION).then((cache) => {
        console.log(`Cached: ${request.url}`)
        cache.put(request, responseClone);
      });
      // console.log(`From network: ${result.status}`);
      resolve(result);
    }, reject);
  });
};

const tryCache = (request) => {
  // console.log("Trying cache")
  return caches.open(CACHE_VERSION).then((cache) => {
    return cache.match(request).then((result) => {
      // console.log(`From cache: ${result.status}`);
      return result || Promise.reject("No match");
    });
  });
};

self.addEventListener("install", (e) => {
  console.log("Service worker installed");
  e.waitUntil(preCache());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clearCache());
});

self.addEventListener("fetch", (e) => {
  // console.log(`Trying network first, if fail go to cache`);
  e.respondWith(tryNetwork(e.request).catch(() => tryCache(e.request)));
});