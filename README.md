# theia-matplotlib-plot

## Run in development mode

See https://theia-ide.org/docs/authoring_plugins

Add the following to Docker (`matplotlib`, `aggdraw` and `matplotlib_imagebackend`)

```
RUN pip3 install -U pip \
    && pip3 install matplotlib aggdraw \
    && pip3 install git+git://github.com/uktrade/matplotlib_imagebackend.git
```

Add the following to package.json

```
"@theia/plugin-dev": "latest",
"@theia/plugin-ext": "latest",
```
