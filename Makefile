build:
	docker build -t zealic/vanitygen-hd .

exec:
	docker run -it --rm --entrypoint=ash zealic/vanitygen-hd
