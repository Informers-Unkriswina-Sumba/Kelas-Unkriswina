import * as admin from 'firebase-admin'

export const verifyIdToken = (token:any) => {
  const firebasePrivateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+mW/Q2AXvpjUX\nH132Ha0hSj2mNU71t+kwSo02p6JXuJ1Z9xdw+LdTld/WspAsVn/lXujBRmQ3CAPk\n1ZEYsbbjyst/PiKZwvhry6vLfhljIg2GrcmbiTEcWoU/GXNoossd539Jx1vzdFTL\nNVqldJL5auBeZsvFlNqL0JM1yGm4HGt8NK+DhmUui0yXga56Tuk+R0KuUfQwiaBe\nBuzXi0i8/a7fQVt+IqvDzY5QbR9coFw5YwJdAz5rN+MkqLnDS7In+6Ux2QpHcwrW\n0WVqigOnDhma0IEGvzypq2xpPWS66jb0/MVgYKanlthCsgEe18nfnPpb1khNhZXc\nHRYNp/ZHAgMBAAECggEABMvQx+0nr/FEeU9WeD5tyXCqh+ea71ZCjaWuCkxUc8Lu\nF0stCGdMGkHHzMBqsFeBdPeR3Pjr6l+8sDRPldLsJhq1b6P4ocguNdp9neuPjI3r\nYlukCEA10d+wr0AV2IQ3DNPgwUA9TK1PlO16xwg5E7kXDpI3owt2JrDQ8Thh1Tpy\nIWm5+/3iaRQcCjkYvcd9hA/ojT05+WHeEKEnSOEO8fdTEUPcfl0xCDEIJk2kmtJ0\n72dhz7i4US9rPtk2klWDul7ergSnC1rhHeROvj4lsoGraBMCsDhzPHCWIEGxWRO4\ngKMxrYHpzzVGSnmCucOEvzZyRUcXj7jLaDqDbIcBQQKBgQDubgFe4cuEVlsLROWi\nVoqXykYiirnF+CVeNzc6fGaxo+VPREtChgmvP8p4mnQU2jh14pwbDfLXmR0zTEUm\nS/b2eyGz+FBZ/yIoHQ2bDsGfPd8O/DRyId8a2Xyn9SSVXk1i+GepNuCLztBVA14n\nW9wlKh5whPozZBA9BIfagYdfCwKBgQDMpRu5erh3F8DCBmnpuDi3+dCvwA79HeTJ\nqJ42kH1SU42+9ZsUixW1mpPMAyIaZ2h4PAcdM+HqKW4XMDk4nV8lbaVEM98wA+SB\nNXabqLp5mS6n4yhQY2mee1IHNJzoTRnVQvjPDt0sPHGRTTI5DcRYiB1EEm9J9rVw\nGebOPEV7NQKBgBZgvsIwARD3pe3l1oOpCbL7ah+903fQNXmlRwq3OFA96LzK1SF2\nQRxwqUkufeyjGp992Fb1tTAlD8eLxgW1JYW2wtAIY0o/Fu6a43cFKIkQnonig+2e\nXjk/5mJBMODQDAVY+Sm5m9OjYoxIF6MsDPpz/I1k/bKrFpcTgMiyVYlHAoGAbVDF\nPo8Peo51qS9D5FVD9wK7Nyag2xTc4dvwp7UHPLLlRNxtusuRDTFFQfVqgjA63f8y\nzaapRyxaYoigCF4INTYc0hHjZwKtTVgBw6Sd99ab1ZLCNi7kfIPjjXXNW0nUQtdD\nkVefTcH76GIUMeXovGH5QCOYzym6QeeUIxaPBwECgYEAio7DpWR6iL+ztAcoPlaT\nT6biADN0dlmGMmw5hOv/nwXtVsvwmfGKPs2ddyhEBCLLAKAGRjn6RoTnt2/AkESs\nDvpPecF3C0BXR0wYfGRnldXGgh3cBjnIk77prX3t3VmcCpckDmpO7NgRtblCLl4e\nD816swapF9bl0CRiWIQdMB4=\n-----END PRIVATE KEY-----\n"; // process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY

  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "kelas-unkriswina-5124a", // process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: "firebase-adminsdk-dpoq4@kelas-unkriswina-5124a.iam.gserviceaccount.com", // process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey?.replace(/\\n/g, '\n'),
      }),
      databaseURL: '', // process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    })
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}