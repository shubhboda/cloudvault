import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Register from "pages/register";
import UploadFiles from "pages/upload-files";
import FileManager from "pages/file-manager";
import AccountSettings from "pages/account-settings";
import BackupSettings from "pages/backup-settings";
import Share from "pages/share";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<FileManager />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload-files" element={<UploadFiles />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/backup-settings" element={<BackupSettings />} />
        <Route path="/share/:fileId" element={<Share />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;