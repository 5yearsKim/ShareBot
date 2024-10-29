import type { Metadata } from "next";
import { MuiProvider } from "@/ui/systems/MuiProvider";
import { SnackbarProvider } from "@/hooks/Snackbar";
import { AccountProvider } from "@/components/$providers/AccountProvider";
import { RecoilProvider } from "@/components/$providers/RecoilProvider";

import { ConfirmDialogShared } from "@/hooks/dialogs/ConfirmDialog";
import { LoginDialogShared } from "@/hooks/dialogs/LoginDialog";

import { buildImgUrl } from "@/utils/media";
import { STAGE, FRONT_URL } from "@/config";
import "@/ui/global.scss";


const title = "셰어봇, 공유 문서 기반 챗봇 플랫폼 ";
const description = "셰어봇을 통해 문서를 업로드 하고 챗봇을 만드세요.";

export const metadata: Metadata = {
  title,
  description,
  icons: "/icons/favicon.ico",
  openGraph: {
    title,
    description,
    type: "website",
    // images: [buildImgUrl("https://" + FRONT_URL, BOT_INFO.thumbnail)]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilProvider>
          <MuiProvider>
            <SnackbarProvider>
              <AccountProvider>

                <ConfirmDialogShared />
                <LoginDialogShared />

                {children}


                {STAGE !== "prod" && (
                  <div
                    style={{
                      position: "fixed",
                      bottom: "5px",
                      right: "5px",
                      color: "red",
                      fontWeight: 900,
                      fontSize: "1.2rem",
                    }}
                  >
                    {STAGE}
                  </div>
                )}

              </AccountProvider>
            </SnackbarProvider>
          </MuiProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
