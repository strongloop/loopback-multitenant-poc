# Multi-tenant LoopBack POC

This is a POC on implementing multi-tenancy in LoopBack using isolated processes and data sources.

## How is it implemented?

A proxy (Gateway) sits infront of individul tenant LoopBack apps. Using the first URL segment as the tenant identifier, Gateway forwards the requests to the corresponding tenant apps.

Tenant apps have their own configurations.

Tenant apps are mapped using their port numbers. In this POC, this allows easy access to the apps' *explorer* app. Unix sockets might be a better option in the actual implementation. 

Gateway is aware about new tenants being added and existing tenants being removed.

## Instructions for a quick overview

We want to create two tenants with their own data sources and models.

Tenant one, named *foo*, will use MySQL as the datasource and have the models *Customer* and *Order*. Tenant two, named *bar*, will use MongoDB as the data source and have the models Customer, Product, and Review.

**Clone this repo**

```
$ git clone <repo location>
```

**Install dependencies**

```
$ npm install
```

**Install commandline tools**

```
$ [sudo] npm link
```

**Create tenant "foo"**

```
$ mtm add foo
```
**Create "Customer" model for tenant "foo"**

```
$ mtm model foo:Customer
```
**Create "Order" model for tenant "foo"**

```
$ mtm model foo:Order
```
Make the necessary changes in the `datasources.json`, `model-config.json`, and the model files.

Similarly, add tenant "bar", and create and edit the necessary files.

**Start the Gateway**

```
$ mtg start
```

The Gateway will start the tenant apps, and accept connections on behalf of them.

The tenant "foo" will be accessible at `http://localhost:9000/apple`, and so on.

## Features

* Customize `model-config.json` and `datasources.json` for each tenant
* A tenant's `model-config.json` and `datasources.json` can be updated without having to restart other tenants
* Each tenant can have custom middleware, components, and boot scripts, if required

## Gateway Manager

The gateway manager works as the front facing proxy for the tenany apps. It is available as the `mtg` command on the command line.

The gateway must be started before the tenant apps can be accessed.

**Start gateway**

```
$ mtg start
```

**Restart gateway**

Note supported currently.

```
$ mtg restart
```

**Stop gateway**

Note supported currently. To stop, press `ctl+c`.

```
$ mtg stop
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

**Start tenant app**

Note supported currently.

```
$ mtm start <tenant id>
```

**Stop tenant app**

Note supported currently.

```
$ mtm stop <tenant id>
```

**Restart tenant app (after making configuration changes)**

Note supported currently.

```
$ mtm restart <tenant id>
```

**Create model for tenant**

```
$ mtm model <tenant id:model name>
```
