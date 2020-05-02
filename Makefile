REPO_NAME=vanitygen-hd
TARGET_DIR=.target
DIST_DIR=.dist
NODE_VER=node12
PACKAGE_TARGETS=$(NODE_VER)-linux,$(NODE_VER)-macos,$(NODE_VER)-win

build:
	@docker build -t zealic/$(REPO_NAME) .

exec:
	@docker run -it --rm --entrypoint=ash zealic/$(REPO_NAME)

clean:
	@rm -rf $(PWD)/$(TARGET_DIR)
	@rm -rf $(PWD)/$(DIST_DIR)

package: clean
	@tsc
	@./node_modules/.bin/pkg -target=$(PACKAGE_TARGETS) --out-path=$(DIST_DIR) $(TARGET_DIR)/$(REPO_NAME).js
	@(set -e; cd $(DIST_DIR); \
		mv $(REPO_NAME)-linux $(REPO_NAME)_linux-amd64; \
		mv $(REPO_NAME)-macos $(REPO_NAME)_darwin-amd64; \
		mv $(REPO_NAME)-win.exe $(REPO_NAME)_windows-amd64.exe; \
	)

dist:
	@(set -e; cd $(DIST_DIR); \
		tar cvzf $(REPO_NAME)_linux-amd64.tar.gz $(REPO_NAME)_linux-amd64; \
		tar cvzf $(REPO_NAME)_darwin-amd64.tar.gz $(REPO_NAME)_darwin-amd64; \
		zip $(REPO_NAME)_windows-amd64.zip $(REPO_NAME)_windows-amd64.exe; \
	)
