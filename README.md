# Multi-tenant LoopBack POC

This is a POC on implementing multi-tenancy in LoopBack using isolated processes and data sources.

## Features

* Customize `model-config.json` and `datasources.json` for each tenant
* Each tenant can have custom middleware, components, and boot scripts, if required

## Tenant Manager

The tenant manager is available as the `mtm` command on the command line.

Use a `tenant id` composed of alphanumerical characters only.

**Add tenant**

```
$ mtm add <tenant id>
```

**Remove tenant**

```
$ mtm remove <tenant id>
```

**Start tenant app**

```
$ mtm start <tenant id>
```

**Stop tenant app**

```
$ mtm stop <tenant id>
```

**Restart tenant app (after making configuration changes)**

```
$ mtm restart <tenant id>
```

**Create model for tenant**

```
$ mtm model <tenant id:model name>
```

## Gateway Manager

The gateway manager is available as the `mtg` command on the command line.

The gateway must be started before the tenant apps can be accessed.
