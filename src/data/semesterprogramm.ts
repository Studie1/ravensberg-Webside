export interface SemesterEvent {
  uid: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
  description?: string;
}

export interface Semesterprogramm {
  title: string;
  slug: string;
  pdfUrl: string;
  icsUrl: string;
  coverImage: string;
  events: SemesterEvent[];
}

export const semesterprogramm: Semesterprogramm = {
  "title": "Sommersemester 2026",
  "slug": "sose-2026",
  "pdfUrl": "/semesterprogramm/sose-2026.pdf",
  "icsUrl": "/semesterprogramm/sose-2026.ics",
  "coverImage": "/semesterprogramm/sose-2026-cover.webp",
  "events": [
    {
      "end": "2026-04-01T06:00:00+02:00",
      "start": "2026-04-01T05:00:00+02:00",
      "title": "Semesterbeginn",
      "uid": "0DA5D62B-CF95-48CF-A57B-6309CCBD5AA7"
    },
    {
      "end": "2026-04-09T19:00:00+02:00",
      "start": "2026-04-09T16:00:00+02:00",
      "title": "Haus- und Gartenarbeit",
      "uid": "93EEE029-45DF-4959-A18C-51A3DEFBCE32"
    },
    {
      "end": "2026-04-11T20:00:00+02:00",
      "start": "2026-04-11T18:00:00+02:00",
      "title": "Semesterantrittsessen",
      "uid": "A2132759-FC61-4BB1-8322-F27F3598A365"
    },
    {
      "end": "2026-04-13T06:00:00+02:00",
      "start": "2026-04-13T05:00:00+02:00",
      "title": "Vorlesungsbeginn",
      "uid": "D21030E6-D544-445B-B1FA-C14657CA9F3C"
    },
    {
      "end": "2026-04-13T23:00:00+02:00",
      "start": "2026-04-13T20:00:00+02:00",
      "title": "1. Aktivenconvent",
      "uid": "20EA5F56-F2F7-42B8-85F0-2A9BE0425E43"
    },
    {
      "end": "2026-04-14T20:00:00+02:00",
      "start": "2026-04-14T19:00:00+02:00",
      "title": "Semesterantrittsgottesdienst",
      "uid": "ADCCD4D7-005E-4572-8211-E6D780FE0FFA"
    },
    {
      "end": "2026-04-18T23:00:00+02:00",
      "start": "2026-04-18T20:00:00+02:00",
      "title": "Semesterankneipe mit Flaggehissen",
      "uid": "B9064BDE-1333-4A1B-B2C0-59A23309C9DA"
    },
    {
      "end": "2026-04-21T23:00:00+02:00",
      "start": "2026-04-21T19:00:00+02:00",
      "title": "KVM- Fuxenbummel",
      "uid": "9AB1A592-2A74-416E-A9EB-9D869ACBDC90"
    },
    {
      "end": "2026-04-26T06:00:00+02:00",
      "start": "2026-04-24T05:00:00+02:00",
      "title": "Aktivenfahrt nach Köln zu e.v. KStV Nibelungen im KV zu Köln",
      "uid": "D4342706-E692-442F-B9C4-D39BB93A46F2"
    },
    {
      "end": "2026-05-01T18:00:00+02:00",
      "start": "2026-05-01T12:00:00+02:00",
      "title": "Maibummel",
      "uid": "AF2E3D4C-D984-4B9C-B913-30C76B6CB264"
    },
    {
      "end": "2026-05-04T23:00:00+02:00",
      "start": "2026-05-04T20:00:00+02:00",
      "title": "2. Aktivenconvent",
      "uid": "CEC95DFB-EF76-4ABA-BB5F-6CE5147EFE04"
    },
    {
      "end": "2026-05-08T23:00:00+02:00",
      "start": "2026-05-08T14:00:00+02:00",
      "title": "Grillabend bei unserem Ib. AH Dr. Sebastian Philips in Ahaus",
      "uid": "C801DAC6-378B-4C5B-BE7A-C0F7A38C454F"
    },
    {
      "end": "2026-05-13T20:00:00+02:00",
      "start": "2026-05-13T18:00:00+02:00",
      "title": "Gemeinsame Fuxenstunde mit e.v. ATV Westmark",
      "uid": "639F4684-FB58-42B0-823A-EECF2017FD59"
    },
    {
      "end": "2026-05-27T20:00:00+02:00",
      "start": "2026-05-27T16:00:00+02:00",
      "title": "Arbeitstag zum 107. Stiftungsfest",
      "uid": "C6A68D01-B1F1-45EA-AFA6-B4BB4C10F880"
    },
    {
      "end": "2026-05-29T23:00:00+02:00",
      "start": "2026-05-29T19:00:00+02:00",
      "title": "Kulinarischer Begrüßungsabend mit Spezialitäten vom Grill",
      "uid": "5DD0169E-61B3-4399-A37C-82239EFD9A90"
    },
    {
      "end": "2026-05-30T15:30:00+02:00",
      "start": "2026-05-30T14:30:00+02:00",
      "title": "Damen- und Kinderprogramm Cumulativconvent im Anschluss AHV- und HBV-Convente",
      "uid": "5405E7CE-A0C7-42AD-880C-9C568F8C5830"
    },
    {
      "end": "2026-05-30T20:30:00+02:00",
      "start": "2026-05-30T19:30:00+02:00",
      "title": "Sektempfang",
      "uid": "FD7FB2C3-0263-4E47-A59A-4AC63438712D"
    },
    {
      "end": "2026-05-30T23:55:00+02:00",
      "start": "2026-05-30T20:00:00+02:00",
      "title": "Festkommers",
      "uid": "743F9733-2822-4D41-83F5-D5EB444D11D5"
    },
    {
      "end": "2026-05-31T03:00:00+02:00",
      "start": "2026-05-31T00:00:00+02:00",
      "title": "Fidulitas auf dem Ravensberghaus",
      "uid": "2B0D5E3F-9BAF-4B46-8938-2FDBC808ECFC"
    },
    {
      "end": "2026-05-31T11:30:00+02:00",
      "start": "2026-05-31T10:30:00+02:00",
      "title": "Besuch der heiligen Messe in der Heilig-Kreuz Kirche",
      "uid": "EAAF7C1A-17AF-4B0B-89CC-BA53E0F355B0"
    },
    {
      "end": "2026-05-31T14:00:00+02:00",
      "start": "2026-05-31T13:00:00+02:00",
      "title": "Gemeinsames Essen im Nordstern",
      "uid": "EB8FA323-ABCE-4647-A834-6E9E323DED6D"
    },
    {
      "end": "2026-06-01T23:00:00+02:00",
      "start": "2026-06-01T20:00:00+02:00",
      "title": "3. Aktivenconvent",
      "uid": "587D50F9-5F3C-477F-BC82-CD20B321E879"
    },
    {
      "end": "2026-06-04T11:00:00+02:00",
      "start": "2026-06-04T10:00:00+02:00",
      "title": "Fronleichnamsprozession",
      "uid": "DB4F81CB-B2BB-4341-BAD1-556810FBB7C2"
    },
    {
      "end": "2026-06-11T18:00:00+02:00",
      "start": "2026-06-11T15:00:00+02:00",
      "title": "Gemeinsames Golfen mit unserem Ib. AH Eric Rödlich und AH Dr Johannes Heinrichbauer auf dem Golfplatz zu Telgte",
      "uid": "FE33D7D1-BF38-4FAE-9276-9570D3393628"
    },
    {
      "end": "2026-06-18T20:00:00+02:00",
      "start": "2026-06-18T16:00:00+02:00",
      "title": "KVM- Fußballtunier",
      "uid": "AD9FDD2A-E079-4A43-9C04-0C4D7FD3B12A"
    },
    {
      "end": "2026-06-23T19:00:00+02:00",
      "start": "2026-06-23T16:00:00+02:00",
      "title": "Akademischer Vortragsabend mit unserem Ib. Bb Yannick Wenger zum Thema KI verstehen und einsetzten",
      "uid": "B1213D83-04D1-494D-9D23-13B1ADEF2D67"
    },
    {
      "end": "2026-06-25T23:00:00+02:00",
      "start": "2026-06-25T20:00:00+02:00",
      "title": "Gemeinsamer WM- Abend mit Grillen bei e.s.v. KStV Germania",
      "uid": "7E9C0A88-27C3-4220-A5BA-AA9C77A390EB"
    },
    {
      "end": "2026-06-27T15:00:00+02:00",
      "start": "2026-06-27T11:00:00+02:00",
      "title": "Führung durch die Rieselfelder Münster mit unserem Ib. AHX Jonas Kemper",
      "uid": "5E7EC623-5C51-4A8A-B83F-0426AEB6680F"
    },
    {
      "end": "2026-07-01T23:00:00+02:00",
      "start": "2026-07-01T18:00:00+02:00",
      "title": "Sommerolympiade mit e.v. ATV Westmark mit anschl. Ausklang",
      "uid": "01F33561-605D-4617-8CDA-4A3C99FC4162"
    },
    {
      "end": "2026-07-05T11:00:00+02:00",
      "start": "2026-07-05T10:00:00+02:00",
      "title": "Pest- und Brandprozession",
      "uid": "7D542D9D-5E3A-46E5-BA9C-1F352E8E210D"
    },
    {
      "end": "2026-07-14T18:00:00+02:00",
      "start": "2026-07-14T16:00:00+02:00",
      "title": "Gemeinsames Blutspenden",
      "uid": "C98A172F-C31F-4160-8C70-A5FBF97F2204"
    },
    {
      "end": "2026-07-21T20:00:00+02:00",
      "start": "2026-07-21T19:00:00+02:00",
      "title": "Semesterabgottesdienst",
      "uid": "679D8D04-90B8-47AA-96EA-CAE831DF158A"
    },
    {
      "end": "2026-08-15T23:00:00+02:00",
      "start": "2026-08-15T20:00:00+02:00",
      "title": "Semesterankneipe mit Flaggeeinholen",
      "uid": "33EE28E0-4E31-401A-A8E3-BAEC3E2CD2B3"
    },
    {
      "end": "2026-08-28T07:00:00+02:00",
      "start": "2026-08-28T06:00:00+02:00",
      "title": "Fuxenausflug nach Bielefeld mit Besuch der Sparrenburg",
      "uid": "ED18702B-6540-45EE-87E9-9291AC5957AE"
    }
  ]
};
