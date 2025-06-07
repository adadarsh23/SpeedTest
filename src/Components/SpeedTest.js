import React, { useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";

const SpeedTest = ({ theme, language, t }) => {
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const testDownload = async () => {
    setStatusMessage(t.testingDownload);
    try {
      const fileUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"; // Sample file URL
      const fileSizeBytes = 10485760;
      const startTime = performance.now();
      const response = await fetch(fileUrl);
      await response.blob();
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const speedMbps = (fileSizeBytes * 8) / duration / 1024 / 1024;
      setDownloadSpeed(Number(speedMbps.toFixed(2)));
    } catch (error) {
      console.error("Download test failed:", error);
      setDownloadSpeed(0);
    }
  };

  const testUpload = async () => {
    setStatusMessage(t.testingUpload);
    try {
      const blob = new Blob([new ArrayBuffer(1024 * 1024)], { type: "application/octet-stream" });
      const startTime = performance.now();
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: blob,
      });
      await response.text();
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const speedMbps = (blob.size * 8) / duration / 1024 / 1024;
      setUploadSpeed(Number(speedMbps.toFixed(2)));
    } catch {
      setUploadSpeed(0);
    }
  };

  const testPing = async () => {
    setStatusMessage(t.testingPing);
    const pings = [];
    for (let i = 0; i < 3; i++) {
      const start = performance.now();
      try {
        await fetch("https://www.google.com", { mode: "no-cors" });
      } catch {}
      const end = performance.now();
      pings.push(end - start);
    }
    const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
    setPing(Number(avgPing.toFixed(0)));
  };

  const getIPInfo = async () => {
    setStatusMessage(t.fetchingIP);
    try {
      const res = await fetch("https://ipapi.co/json");
      const data = await res.json();
      setIpData(data);
    } catch {
      setIpData(null);
    }
  };

  const runTests = async () => {
    setLoading(true);
    setStatusMessage(t.runningTests);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);
    setIpData(null);
    await getIPInfo();
    await testPing();
    await testDownload();
    await testUpload();
    setStatusMessage(t.testComplete);
    setLoading(false);
  };

  const getPingColor = () => {
    if (ping < 50) return "text-green-600";
    if (ping < 100) return "text-yellow-500";
    return "text-red-600";
  };

  const getPingStatus = () => {
    if (ping < 50) return t.excellent || "Excellent";
    if (ping < 100) return t.good || "Good";
    return t.poor || "Poor";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-black py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-white">{t.speedTest}</h1>

        {loading && <LoadingSpinner text={statusMessage || t.loading} />}

        {!loading && (
          <>
            {ipData && (
              <div className="text-left text-sm bg-white/90 dark:bg-gray-700/80 p-4 rounded-lg shadow space-y-1">
                <p><strong>{t.ip}:</strong> {ipData.ip}</p>
                <p><strong>{t.location}:</strong> {ipData.city}, {ipData.region}, {ipData.country_name}</p>
                <p><strong>{t.isp}:</strong> {ipData.org}</p>
                {ipData.asn && <p><strong>{t.asn}:</strong> {ipData.asn}</p>}
                {ipData.hostname && <p><strong>{t.hostname}:</strong> {ipData.hostname}</p>}
                {ipData.timezone && <p><strong>{t.timezone}:</strong> {ipData.timezone}</p>}
                {ipData.utc_offset && <p><strong>{t.utcOffset}:</strong> {ipData.utc_offset}</p>}
                {ipData.postal && <p><strong>{t.postal}:</strong> {ipData.postal}</p>}
                {ipData.latitude && <p><strong>{t.latitude}:</strong> {ipData.latitude}</p>}
                {ipData.longitude && <p><strong>{t.longitude}:</strong> {ipData.longitude}</p>}
                {typeof ipData.in_eu === "boolean" && (
                  <p><strong>{t.inEU}:</strong> {ipData.in_eu ? t.yes : t.no}</p>
                )}
                {ipData.country_calling_code && (
                  <p><strong>{t.callingCode}:</strong> {ipData.country_calling_code}</p>
                )}
                {ipData.currency && ipData.currency_name && (
                  <p><strong>{t.currency}:</strong> {ipData.currency} ({ipData.currency_name})</p>
                )}
                {ipData.country_area && (
                  <p><strong>{t.countryArea}:</strong> {ipData.country_area.toLocaleString()} km²</p>
                )}
                {ipData.country_population && (
                  <p><strong>{t.population}:</strong> {ipData.country_population.toLocaleString()}</p>
                )}
                {ipData.network && (
                  <p><strong>{t.network}:</strong> {ipData.network}</p>
                )}
              </div>
            )}

            <div className="space-y-6 text-lg font-semibold text-gray-800 dark:text-gray-200">
              <p>📥 {t.downloadSpeed}: <span className="text-blue-600">{downloadSpeed} Mbps</span></p>
              <p>📤 {t.uploadSpeed}: <span className="text-green-600">{uploadSpeed} Mbps</span></p>

              <div className="inline-block bg-white dark:bg-gray-700 p-5 rounded-xl shadow-lg">
                <p className="text-xl font-medium text-gray-600 dark:text-gray-200">{t.latency || "Latency"}</p>
                <p className={`text-4xl font-extrabold ${getPingColor()}`}>{ping} ms</p>
                <p className="text-sm text-gray-500 italic">{getPingStatus()}</p>
              </div>
            </div>
          </>
        )}

        <button
          onClick={runTests}
          disabled={loading}
          className={`mt-6 px-8 py-3 font-semibold text-white rounded-full transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
          }`}
        >
          {loading ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            t.startTest || "Start Test"
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeedTest;
