module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        tsconfig: "./tsconfig.json",
      },
    },
    run: {
      target: {
        cmd: "node",
        args: ["./server.js"],
      },
    },
  });

  // plugins
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-run");

  // tasks
  grunt.registerTask("default", ["ts", "run"]);
};
