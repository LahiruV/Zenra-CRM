@@ .. @@
+  logout: () => {
+    store.dispatch(logout());
+    // Additional cleanup can be done here
+    // e.g., clear cookies, redirect to login page
+  },