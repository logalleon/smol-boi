dist := ./public/
src := ./src/

app := $(src)js/index.js
srcJS := $(wildcard $(src)js/*.js)
minifiedJS := $(dist)index.min.js

sass := $(wildcard $(src)sass/*.scss)
css := $(src)css/main.css
minifiedCSS := $(dist)main.min.css

build : $(minifiedJS) $(minifiedCSS) ;

$(minifiedJS) : $(app) $(srcJS)
	browserify \
	-t [ reactify --es6 ] $(app) | \
	uglifyjs -c -m > $(minifiedJS)

$(minifiedCSS) : $(css)
	cleancss -o $(minifiedCSS) $(css)

$(css) : $(sass)
	sass $(src)sass/main.scss > $(css)