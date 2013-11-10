VERSION=1.2.2
NAME=jquery.skinswitcher-${VERSION}

SOURCES=${NAME}.js ${NAME}.css
COMPRESSED=${NAME}.min.js ${NAME}.min.css
MISC=AUTHORS CHANGELOG GPL-LICENSE.txt MIT-LICENSE.txt README.md

FILES=${SOURCES} ${COMPRESSED} ${MISC}

BUILD=builds/jquery-skinswitcher-${VERSION}.zip


build: ${NAME}.js ${NAME}.css
	cp jquery.skinswitcher.js ${NAME}.js
	cp jquery.skinswitcher.css ${NAME}.css
	mkdir -p `dirname ${BUILD}`
	zip ${BUILD} ${FILES}

${NAME}.js:
	curl -d compilation_level=WHITESPACE_ONLY \
	     -d output_format=text \
	     -d output_info=compiled_code \
	     --data-urlencode js_code@jquery.skinswitcher.js \
	     http://closure-compiler.appspot.com/compile > jquery.skinswitcher.min.js
	cp jquery.skinswitcher.min.js jquery.skinswitcher-${VERSION}.min.js

${NAME}.css:
	curl http://mabblog.com/cssoptimizer/service.php \
		 -F "data=<jquery.skinswitcher.css" > jquery.skinswitcher.min.css
	cp jquery.skinswitcher.min.css jquery.skinswitcher-${VERSION}.min.css

clean:
	rm ${SOURCES} ${COMPRESSED}
