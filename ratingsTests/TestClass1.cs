using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ratingsTests
{
    [TestClass]
    //[DeploymentItem(@"..\..\tests_src", "tests_src")]
    public class TestClass1
    {
        private TestContext _context;
        public TestContext TestContext
        {
            set { this._context = value; }
        }

        [TestMethod]
        public void addTwoNumbersWith1And2Expect3()
        {
            var jsHelper = new JavaScriptTestHelper(_context);
            // Load JavaScript files
            jsHelper.LoadFiles(new[]
            {
                @"tsUnit.js",
                @"simpleTest.js"
                
            });
            // Execute JavaScript Test
            jsHelper.ExecuteTest("addTwoNumbersWith1And2Expect3");
        }

        [TestMethod]
        public void addTwoNumbersWith3And2Expect5()
        {
            var jsHelper = new JavaScriptTestHelper(_context);
            // Load JavaScript files
            jsHelper.LoadFiles(new[]
            {
                @"tsUnit.js",
                @"simpleTest.js"
                
            });
            // Execute JavaScript Test
            jsHelper.ExecuteTest("addTwoNumbersWith3And2Expect5");
        }
    }
}
