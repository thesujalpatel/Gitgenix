"use client";

import { useState, useEffect } from "react";
import {
  auditPageSEO,
  generateSEOReport,
  SEOAuditResult,
} from "../utils/seo-audit";

export default function SEODashboard() {
  const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV === "development") {
      // Run audit after page loads
      const timer = setTimeout(() => {
        const result = auditPageSEO(window.location.href);
        setAuditResult(result);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (process.env.NODE_ENV !== "development" || !auditResult) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🎉";
    if (score >= 80) return "✅";
    if (score >= 70) return "⚠️";
    return "❌";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
          title="SEO Audit Results"
        >
          {getScoreEmoji(auditResult.score)} SEO: {auditResult.score}/100
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-md max-h-96 overflow-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              SEO Audit
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  auditResult.score
                )}`}
              >
                {getScoreEmoji(auditResult.score)} {auditResult.score}/100
              </div>
            </div>

            {auditResult.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
                  Issues ({auditResult.issues.length})
                </h4>
                <ul className="text-sm space-y-1">
                  {auditResult.issues.slice(0, 3).map((issue, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      • {issue}
                    </li>
                  ))}
                  {auditResult.issues.length > 3 && (
                    <li className="text-gray-500 dark:text-gray-400 text-xs">
                      +{auditResult.issues.length - 3} more issues
                    </li>
                  )}
                </ul>
              </div>
            )}

            {auditResult.passed.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
                  Passed ({auditResult.passed.length})
                </h4>
                <ul className="text-sm space-y-1">
                  {auditResult.passed.slice(0, 2).map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      • {item}
                    </li>
                  ))}
                  {auditResult.passed.length > 2 && (
                    <li className="text-gray-500 dark:text-gray-400 text-xs">
                      +{auditResult.passed.length - 2} more passed
                    </li>
                  )}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                const report = generateSEOReport(auditResult);
                console.log(report);
                alert("SEO report logged to console");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
            >
              View Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
