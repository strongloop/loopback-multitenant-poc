# Multi-tenant LoopBack POC

This is a POC on implementing multi-tenancy in LoopBack using isolated processa and data sources.

## Usage

Use a `tenant id` composed of alphanumerical characters only.

**Add tenant**

```
$ mt add <tenant id>
```

**Remove tenant**

```
$ mt remove <tenant id>
```

**Start tenant app**

```
$ mt start <tenant id>
```

**Stop tenant app**

```
$ mt stop <tenant id>
```

**Restart tenant app (after making configuration changes)**

```
$ mt restart <tenant id>
```

**Create model for tenant**

```
$ mt model <tenant id:model name>
```

## Features

* Customize `model-config.json` and `datasources.json` for each tenant
* Each tenant can have custom middleware, components, and boot scripts, if required
