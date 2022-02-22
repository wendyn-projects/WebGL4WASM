#!/usr/bin/env python3
# -*- coding: utf-8 -*
import http.server
import socketserver

PORT = 8000
DIRECTORY = "testwww"

socketserver.allow_reuse_address = True

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
