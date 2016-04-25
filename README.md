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

Use a `tenant id` composed of alphanumerical characters only.

The tenant config files must be manually configured in the POC.

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
