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


const title = "가십바오, 가십거리 좋아하는 AI 챗봇";
const description = "Gossip bao, 우리 조직 가십 이야기 나눠줄 AI 챗봇";

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
