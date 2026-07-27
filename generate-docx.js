// Generates resume.docx: a plain, traditional Word resume (no site styling,
// no "commit tag" labels) suitable for sharing with prospective employers.
// Run: npm run docx
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, TabStopType, LevelFormat, convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const INK = '000000';
const MUTED = '555555';
const RIGHT_TAB = convertInchesToTwip(6.5); // usable width at 1in margins on a Letter page

const bulletNumbering = {
  config: [
    {
      reference: 'bullets',
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } } },
        },
      ],
    },
  ],
};

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 240, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 2 } },
    children: [
      new TextRun({ text: text.toUpperCase(), bold: true, font: FONT, size: 24, color: INK, characterSpacing: 12 }),
    ],
  });
}

function jobHeader(title, company, dates) {
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    spacing: { before: 160, after: 0 },
    children: [
      new TextRun({ text: `${title}, ${company}`, bold: true, font: FONT, size: 23, color: INK }),
      new TextRun({ text: `\t${dates}`, font: FONT, size: 21, color: MUTED }),
    ],
  });
}

function jobLocation(text) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [new TextRun({ text, italics: true, font: FONT, size: 20, color: MUTED })],
  });
}

function bodyParagraph(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });
}

const doc = new Document({
  numbering: bulletNumbering,
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.7),
            bottom: convertInchesToTwip(0.7),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // ---- Header ----
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [new TextRun({ text: 'Indira Jambulingam', bold: true, font: FONT, size: 40, color: INK })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [new TextRun({ text: 'Content Strategist & Documentation Architect', font: FONT, size: 24, color: MUTED })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '999999', space: 8 } },
          children: [
            new TextRun({
              text: 'indirajambu@gmail.com  |  510 387 4149  |  Fremont, CA  |  linkedin.com/in/indirajambulingam',
              font: FONT, size: 19, color: MUTED,
            }),
          ],
        }),

        // ---- Summary ----
        sectionHeading('Summary'),
        bodyParagraph(
          ' 15+ years building and scaling documentation systems that turn technical complexity into clear, user-centric storytelling. Proven track record leading enterprise documentation strategy, consolidating content into unified developer repositories, and defining KPIs that tie documentation to product adoption. Uses AI tools, including Claude Code, to modernize content workflows—from planning to customer issue triage.'
        ),
        

        // ---- Experience ----
        sectionHeading('Experience'),

        jobHeader('Content Designer', 'JPMorgan Chase', 'June 2021 – Present'),
        jobLocation('Palo Alto, CA'),
        bullet('Owned developer documentation and communications for the JPMC enterprise platform, treating it as a product.'),
        bullet('Project managed documentation across 20+ SDLC tools using Jira Service Management.'),
        bullet('Created and implemented a documentation-request intake process using Jira Issue Collectors, reducing email volume, increasing visibility of the book of work, and providing a scalable, repeatable workflow for 20+ engineering teams.'),
        bullet("Partnered with Engineering teams to extract technical knowledge and build deep expertise in the firm's developer toolchain."),
        bullet('Partnered with Product Management and Engineering to ensure accuracy, consistency, and completeness of the product across releases, owning the entire communication process.'),
        bullet('Provided subject matter expertise by facilitating cross-functional training on docs-as-code workflows and the software development lifecycle.'),
        bullet('Managed successful docs-as-code releases by troubleshooting and mitigating pipeline deployment issues.'),
        bullet('Designed and developed comprehensive product documentation, including conceptual overviews, step-by-step guides, API reference materials, and interactive tutorials for developer audiences.'),
        bullet('Delivered feature updates, release documentation, and editorial review deliverables across Software Development Lifecycle product tools while using a storytelling approach to best communicate technical concepts.'),
        bullet('Provided clarity for complex concepts for a diverse global developer community by utilizing written storytelling techniques.'),
        bullet('Authored and maintained a shared style guide and information architecture to unify content voice and structure across a multi-contributor documentation environment.'),
        bullet("Led the content migration of legacy documentation into a unified, governed documentation portal (Hugo static site), building a tracking framework to measure migration scope, cross-references, and effort across the JPMC enterprise platform's product line."),
        bullet('Created, operated, and maintained doc repositories for the entire product line of 20+ SDLC tools (guides ranging from concepts, developer, onboarding, installation, migrations, troubleshooting and reference materials – code samples, schema, configurations, APIs).'),
        bullet('Reduced content inaccuracies by incorporating a customer feedback mechanism to track and mitigate all queries across the platform.'),
        bullet('Improved SEO across the enterprise platform by using Adobe Analytics metrics to surface search and discoverability gaps.'),
        bullet('Analyzed and implemented customer feedback to continuously improve content effectiveness.'),
        bullet('Built a structured stakeholder communications process to keep knowledge content aligned with upcoming product and platform changes.'),
        bullet('Improved content and workflow clarity, scaled knowledge production, and reduced time spent on documentation tasks by adopting AI-assisted authoring tools.'),
        

        jobHeader('Content Strategist', 'Roku Inc. (Contract)', 'Jan 2020 – May 2021'),
        jobLocation('San Jose, CA'),
        bullet('Authored and owned user documentation for Roku Platform and Products, with emphasis on Roku Pay.'),
        bullet('Collaborated with cross-functional teams (Product, UX, Engineering, Legal) on content reviews.'),
        bullet('Enhanced content discoverability using SEO best practices; analyzed analytics to understand support call drivers.'),
        bullet('Architected a content process giving visibility into editorial tasks and blockers.'),
        bullet('Created a style guide for the knowledge base and terminology nomenclature to improve usability.'),
        bullet('Worked with the International Payments team to design and localize content across geographies, interfacing with localization vendors and LQA.'),
        bullet('Participated in usability studies to shape knowledge base articles and on-screen text; reported on content metrics with leadership.'),

        jobHeader('Staff Technical Writer', 'Delphix Corp', 'Jul 2018 – Jan 2020'),
        jobLocation('Redwood City, CA'),
        bullet('Architected and delivered single-source documentation, enhancing searchability for content strategy.'),
        bullet('Designed and architected the Knowledge Base for the Delphix Support portal.'),
        bullet('Designed an improved review workflow for Engineering and streamlined the KB review process.'),
        bullet('Created a style guide and authoring guidance for Engineering-authored knowledge content.'),
        bullet('Managed the review and publish lifecycle of knowledge articles; reported metrics to Customer Support Management.'),

        jobHeader('Principal Technical Writer', 'Model N Systems', '2010 – Jun 2018'),
        jobLocation('Redwood Shores, CA'),
        bullet("Planned and delivered single-source documentation for Model N's Revenue Enterprise and Cloud-based SaaS applications."),
        bullet('Automated the process to extract DevOps content per release.'),
        bullet('Migrated single-source content from FrameMaker/Confluence to MindTouch; architected content for the doc portal across product verticals.'),
        bullet('Served as Doc Portal administrator and primary contact for customer enablement; led and mentored an offshore doc team.'),

        jobHeader('Technical Writer', 'Accela Inc. (Contract)', '2010'),
        jobLocation('San Ramon, CA'),
        bullet('Wrote and delivered Admin User Guides (Help and Online); reviewed on-screen text for localization.'),

        jobHeader('Sr. Technical Writer', 'ACCESS Systems Inc. / PalmSource Inc.', '2003 – 2009'),
        jobLocation('Sunnyvale, CA'),
        bullet('Generated content for the ALP (ACCESS Linux Platform) application suite, including documentation and on-screen text.'),
        bullet('Led global doc projects and localization processes, including British English translation via SDL Trados.'),
        bullet('Created the company style guide for unity and consistency across documentation and branding.'),

        // ---- Skills ----
        sectionHeading('Skills'),
        bodyParagraph(
          'Tools: Jira, Confluence, Lucid, Bitbucket, GitHub, Perforce, Git, Sublime Text, IntelliJ IDEA, Visual Studio Code, Jenkins, Spinnaker, Kaniko, Docker Desktop, Gradle, Visio, Gliffy, Adobe Creative Suite, Microsoft Office Suite, Slack, SharePoint, MindTouch, RoboHelp, Looker, Smartling, SDL Trados, Hugo, Jekyll, GitHub Copilot, Claude Code'
        ),
        bodyParagraph(
          'Bug Tracking & PM: Zendesk, Jira Service Desk, ServiceNow, Jira, TeamTrack, SD Tracker, Bugzilla, Rally, MS Project'
        ),
        bodyParagraph(
          'Languages: Bash/Shell, PowerShell, Markdown, HTML/CSS, YAML, Java, JavaScript, JSON, XML'
        ),

        // ---- Education ----
        sectionHeading('Education'),
        bullet('Technical Communication Certification — De Anza College, Cupertino, CA'),
        bullet('M.B.A. (Management) — Armstrong University, Berkeley, CA'),
        bullet('B.A. Sociology — Stella Maris College, Chennai, India'),
        bullet('SEO Fundamentals Certificate, Online (continuing education)'),
        bullet('User Research Analysis Certificate, Online (continuing education)'),

        // ---- Extracurriculars ----
        sectionHeading('Extracurriculars'),
        bodyParagraph(
          'California Tamil Academy — Liaison officer for Redmond Tamil Schools, affiliated with the California Tamil Academy, promoting the Tamil language internationally. Contributor since 2008.'
        ),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(require('path').resolve(__dirname, 'resume.docx'), buffer);
  console.log('resume.docx regenerated');
});
