using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace addHeader
{
    class Program
    {
        private const string HeaderStart = "// ==UserScript==";
        private const string HeaderEnd = "// ==/UserScript==";

        private static readonly string[] Headers4All =
        {
            "// @name Ratings for FS.TO (ex FS.UA) and EX.UA",
        };

        private static readonly string[] HeadersCommon =
        {
            "// @include http://fs.to/*",
            "// @include http://brb.to/*",
            "// @include http://ewq.to/*",
            "// @include http://sdf.to/*",
            "// @include http://www.ex.ua/*",
            "// @include http://www.kinopoisk.ru/film/*",
            "// @all-frames true"
        };

        private static readonly string[][] HeadersAdditional =
        {
            //new[]
            //{
            //    "common.js", "// @all-frames true"
            //},
            //new[]
            //{
            //    "xhr.js", "// @all-frames true"
            //},
            //new[]
            //{
            //    "KpDatabaseInfo_Helper.js", "// @all-frames true"
            //},
        };

        private static readonly string[][] Headers4Files =
        {
            new[]
            {
                "KpDatabaseInfo_Helper.js", "// @include http://www.kinopoisk.ru/film/*"
            },
            //new[]
            //{
            //    "EXUAInformationProvider.js", "// @include http://www.ex.ua/*"
            //},
            //new[]
            //{
            //    "FSUAInformationProvider.js",
            //    "// @include http://fs.to/*",
            //    "// @include http://brb.to/*",
            //    "// @include http://ewq.to/*",
            //    "// @include http://sdf.to/*"
            //}
        };

        static void Main(string[] args)
        {
            if (args.Length < 1)
            {
                return;
            }

            var di = new DirectoryInfo(args[0]);
            if (di.Exists == false)
            {
                return;
            }

            var stack = new Stack<DirectoryInfo>();
            stack.Push(di);

            Action<DirectoryInfo> processor = UpdateHeaders;
            if (args.Length > 1)
                processor = RemoveHeaders;

            while (stack.Count > 0)
            {
                DirectoryInfo dirCurrent = stack.Pop();
                processor(dirCurrent);
                foreach (var dir in dirCurrent.EnumerateDirectories())
                {
                    stack.Push(dir);
                }
            }
            
        }

        private static void UpdateHeaders(DirectoryInfo di)
        {
            foreach (var file in di.EnumerateFiles("*.js"))
            {
                WriteHeadersToFile(file);
            }

        }

        private static void WriteHeadersToFile(FileInfo file)
        {
            Console.Out.WriteLine("file = {0}", file.FullName);

            var fileNew = file.FullName + ".new";

            using (StreamReader reader = file.OpenText())
            {
                using (var writer = new StreamWriter(fileNew, false, Encoding.UTF8))
                {
                    WriteHeaders(file, writer);

                    string s = reader.ReadToEnd();
                    writer.Write(s);
                }
            }
            file.Delete();
            File.Move(fileNew, file.FullName);
        }

        private static void WriteHeaders(FileInfo file, StreamWriter writer)
        {
            writer.WriteLine(HeaderStart);

            foreach (var item in Headers4All)
            {
                writer.WriteLine(item);
            }

            bool useCommon = true;
            foreach (var strings in Headers4Files.Where(strings => file.Name == strings[0]))
            {
                for (int i = 1; i < strings.Length; i++)
                {
                    writer.WriteLine(strings[i]);
                    useCommon = false;
                }
            }

            if (useCommon)
            {
                foreach (var header in HeadersCommon)
                {
                    writer.WriteLine(header);
                }
            }

            foreach (var headers in HeadersAdditional.Where(strings => file.Name == strings[0]))
            {
                for (int i = 1; i < headers.Length; i++)
                {
                    writer.WriteLine(headers[i]);
                }
            }

            writer.WriteLine(HeaderEnd);
            writer.WriteLine();
        }


        private static void RemoveHeaders(DirectoryInfo di)
        {
            foreach (var file in di.EnumerateFiles("*.ts"))
            {
                RemoveHeaderFromFile(file);
            }

            foreach (var file in di.EnumerateFiles("*.js"))
            {
                RemoveHeaderFromFile(file);
            }
        }

        private static void RemoveHeaderFromFile(FileInfo file)
        {
            Console.Out.WriteLine("file = {0}", file.FullName);
            var fileNew = file.FullName + ".new";

            using (StreamReader reader = file.OpenText())
            {
                using (var writer = new StreamWriter(fileNew, false, Encoding.UTF8))
                {
                    string s = reader.ReadLine();
                    if (s != null)
                    {
                        if (s.StartsWith(HeaderStart))
                        {
                            do
                            {
                                s = reader.ReadLine();
                            } while ((s != null) && (s.StartsWith(HeaderEnd) == false));
                            if (s == null)
                                return;
                        }
                        else
                        {
                            s = s.Trim();
                            if (s != string.Empty)
                                writer.WriteLine(s);
                        }
                        s = reader.ReadToEnd().Trim();
                        writer.Write(s);
                    }
                }
            }
            file.Delete();
            File.Move(fileNew, file.FullName);
        }
    }
}
