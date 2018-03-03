dist := ./public/
src := ./src/

app := $(wildcard $(src)js/*.js)
minifiedJS := $(dist)index.min.js

sass := $(wildcard $(src)sass/*.scss)
css := $(src)css/main.css
minifiedCSS := $(dist)main.min.css

build : $(minifiedJS) $(minifiedCSS) ;

$(minifiedJS) : $(app)
	browserify $(app) \
	-t reactify \
	-t uglifyify \
	-o $(minifiedJS)

$(minifiedCSS) : $(css)
	cleancss -o $(minifiedCSS) $(css)

$(css) : $(sass)
	sass $(src)sass/main.scss > $(css)