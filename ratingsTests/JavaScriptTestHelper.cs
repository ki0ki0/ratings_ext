using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MSScriptControl;

namespace ratingsTests
{
    [ExcludeFromCodeCoverage]
    public class JavaScriptTestHelper : IDisposable
    {
        private ScriptControl _script;
        private TestContext _context;
        public JavaScriptTestHelper(TestContext testContext)
        {
            _context = testContext;
            _script = new ScriptControl();
            _script.Language = "JScript";
            _script.AllowUI = false;
            LoadShim();
        }
        public void LoadFile(string path)
        {
            var fileContents = File.ReadAllText(path);
            _script.AddCode(fileContents);
        }
        public void LoadFiles(string[] paths)
        {
            foreach (string path in paths)
            {
                LoadFile(path);
            }
        }
        public void ExecuteTest(string testMethodName)
        {
            dynamic result = null;
            try
            {
                result = _script.Run(testMethodName, new object[] { });
            }
            catch
            {
                var error = ((IScriptControl)_script).Error;
                if (error != null && _context != null)
                {
                    _context.WriteLine(String.Format("{0} rnLine: {1} Column: {2}", error.Source, error.Line, error.Column));
                }
                throw new AssertFailedException(error.Description);
            }
        }
        public void Dispose()
        {
            _script = null;
        }
        private void LoadShim()
        {
            _script.AddCode("var isMsScriptEngineContext = true; var window = window || {}; var document = document || {};");
        }
    }
}