# Multi-tenant LoopBack POC using mounted sub apps

This is a POC on implementing multi-tenancy in LoopBack using mounted sub apps.

## How is it implemented?

A base LoopBack app mounts the tenant sub apps with their own models and data sources.

## Instructions for a quick demo

```
$ git clone git@github.com:strongloop/loopback-multitenant-poc.git
$ cd loopback-multitenant-poc
$ git checkout mounted-apps
$ cd app
$ npm install
$ node .
```

## Tenant Manager

The tenant manager is used for managing tenants and their models. It is available as the `mtm` command on the command line.

```
$ git clone git@github.com:strongloop/loopback-multitenant-poc.git
$ cd loopback-multitenant-poc
$ git checkout mounted-apps
$ npm install
$ npm link
```

Now, that the `mtm` command is available to you, you can run the following anywhere on your machine.

**Initialize a base LoopBack app**

```
$ mtm init <app name>
```
This will create the base LoopBack app, `cd` to the dir, and run `npm install` to install dependencies.

From the app dir, execute the following:

**Add tenant**

```
$ mtm add <tenant id>
```

**Remove tenant**

```
$ mtm remove <tenant id>
```

**Create model for tenant**

```
$ mtm model <tenant id:model name>
```

You will need to manually edit the model and data source files for the tenants.
