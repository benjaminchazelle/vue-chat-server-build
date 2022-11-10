const fs = require("fs");

class DB {
  constructor(data = {}, path = ".data/db.json") {
    this.defaultData = JSON.parse(JSON.stringify(data));
    this.data = data;
    this.path = path;
    if (!this.load()) {
      this.sync();
    }
  }

  reset() {
    this.data = this.defaultData;
    this.sync();
  }

  exists() {
    return fs.existsSync(this.path);
  }

  load() {
    if (fs.existsSync(this.path)) {
      this.data = JSON.parse(fs.readFileSync(this.path).toString());

      return true;
    } else {
      return false;
    }
  }

  sync() {
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  get() {
    return {
      db: this,
      data: this.data
    };
  }
}

module.exports = DB;

