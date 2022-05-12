# general

You can run all services using [PM2](https://pm2.keymetrics.io/).

First, setup the global utils:

```shell
npm install -g nodemon
npm install -g pm2
```

Now, you can start everything by running the command:

```shell
pm2 start ./ecosystem.config.js
```

To see logs from all services in real time:

```shell
pm2 logs
```

To stop everything:

```shell
pm2 stop ./ecosystem.config.js
```

If you edit the file `./ecosystem.config.js`, you need to remove the current configuration:

```shell
pm2 delete ./ecosystem.config.js
```
