import { jsPDF } from "jspdf";

export function downloadDaviCV() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Colors
  const darkNavy = [15, 23, 42]; // #0f172a
  const blueAccent = [30, 41, 59]; // #1e293b
  const borderLight = [228, 228, 231]; // #e4e4e7
  const bodyGray = [82, 82, 91]; // #52525b
  const blackText = [9, 9, 11]; // #09090b

  // Page dimensions (A4 is 210mm x 297mm)
  const marginX = 20;
  let y = 20;

  // Header band
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 16, "F");

  y = 28;

  // Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("DAVI ROCHA", marginX, y);

  // Subtitle
  y += 7;
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text("Estudante de Engenharia de Software | ML Researcher | Full Stack Developer", marginX, y);

  // Divider
  y += 4;
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.line(marginX, y, 210 - marginX, y);
  y += 6;

  // Horizontal Contact Info (compact row)
  doc.setFontSize(8.5);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("Email:", marginX, y);
  
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text("davirocha12.80@gmail.com", marginX + 11, y);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("Tel:", marginX + 60, y);

  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text("+55 (61) 99322-1881", marginX + 66, y);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("Loc:", marginX + 105, y);

  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text("Brasília, DF, Brasil", marginX + 112, y);

  doc.setFont("Helvetica", "bold");
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("LinkedIn:", marginX + 145, y);

  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text("linkedin.com/in/davi-rogs1", marginX + 160, y);

  y += 8;

  // Utility function for drawing section headers
  const drawSectionHeader = (title: string, currentY: number) => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(title, marginX, currentY);
    
    // Draw thick dark accent bar on the left
    doc.setFillColor(15, 23, 42);
    doc.rect(marginX - 4, currentY - 3.5, 2, 4.5, "F");

    // Draw bottom accent line
    doc.setDrawColor(244, 244, 245); // zinc-100
    doc.line(marginX, currentY + 2, 210 - marginX, currentY + 2);
    return currentY + 7;
  };

  // 1. Objetivo
  y = drawSectionHeader("OBJETIVO", y);
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  const objText = "Eu sou estudante apaixonado pela Engenharia de Software na Universidade de Brasília (UnB), uma pessoa que pensa longe e nunca gosto de ficar parado e estou em busca do primeiro emprego na área de Engenharia de Software.";
  const splitObj = doc.splitTextToSize(objText, 210 - 2 * marginX);
  doc.text(splitObj, marginX, y);
  y += splitObj.length * 4.5 + 4;

  // 2. Experiência Profissional
  y = drawSectionHeader("EXPERIÊNCIA PROFISSIONAL", y);

  const experiences = [
    {
      role: "Pesquisador de Machine Learning na Educação",
      period: "06/2025 - Atual (1 ano)",
      company: "Centro de Estudos, Desenvolvimento e Inovação em Software - Gama, DF",
      desc: "Iniciação Científica conduzida pelo CEDIS e UnB com o objetivo de construir um Modelo Preditivo que utiliza algoritmos estatísticos para antecipar flutuações na motivação, no desempenho e no risco de evasão dos alunos em um ambiente educacional gamificado."
    },
    {
      role: "Assessor de Negócios",
      period: "06/2022 - 01/2025 (2 anos e 8 meses)",
      company: "Orc'estra Gamificação - Gama, DF",
      desc: "Experiência com captação e recepção de possíveis clientes, atuando na área de vendas para identificar oportunidades de negócios, criar estratégias eficientes para prospectar clientes e gerenciá-los de maneira eficaz. Foco no aumento das chances de conversão em vendas utilizando métodos Rapport, gerando melhor aproximação com os clientes, com o fim de manter um relacionamento de qualidade e fidelizá-los."
    },
    {
      role: "Gerente de Projetos",
      period: "04/2024 - 05/2024 (2 meses)",
      company: "Orc'estra Gamificação - Gama, DF",
      desc: "Coordenação de projetos e gestão de equipes, assegurando que as entregas fossem realizadas de acordo com os prazos definidos. Gestão da comunicação entre as partes interessadas para manter as expectativas alinhadas e plenamente atendidas."
    },
    {
      role: "Coordenador de Gestão de Processos",
      period: "05/2023 - 09/2023 (5 meses)",
      company: "Orc'estra Gamificação - Gama, DF",
      desc: "Otimização e aprimoramento dos fluxos de trabalho e processos comerciais. Atuação no mapeamento de processos existentes, identificação de gargalos operacionais e implementação de estratégias de melhoria de eficiência comercial."
    }
  ];

  experiences.forEach((exp) => {
    // Check if we need to insert a page break
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(blackText[0], blackText[1], blackText[2]);
    doc.text(exp.role, marginX, y);

    // Period align right
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    const periodWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, 210 - marginX - periodWidth, y);

    y += 4;
    doc.setFont("Helvetica", "medium");
    doc.setFontSize(8.5);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(exp.company, marginX, y);

    y += 4;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    const splitDesc = doc.splitTextToSize(exp.desc, 210 - 2 * marginX);
    doc.text(splitDesc, marginX, y);
    
    y += splitDesc.length * 4 + 4;
  });

  // Page break for the secondary structures if needed
  if (y > 200) {
    doc.addPage();
    y = 20;

    // Header band on page 2
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 10, "F");
    y = 24;
  }

  // 3. Formação Acadêmica
  y = drawSectionHeader("FORMAÇÃO ACADÊMICA", y);
  
  const education = [
    {
      title: "Bacharelado em Engenharia de Software",
      period: "02/2022 - 02/2027 (Previsão)",
      institution: "Universidade de Brasília (UnB) - Gama, Distrito Federal"
    },
    {
      title: "Ensino de Inglês como Segundo Idioma",
      period: "02/2023 - 11/2026",
      institution: "Formação de Idiomas / Certificado correspondente"
    }
  ];

  education.forEach((edu) => {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(blackText[0], blackText[1], blackText[2]);
    doc.text(edu.title, marginX, y);

    const periodWidth = doc.getTextWidth(edu.period);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
    doc.text(edu.period, 210 - marginX - periodWidth, y);

    y += 4;
    doc.setFont("Helvetica", "medium");
    doc.setFontSize(8.5);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(edu.institution, marginX, y);
    y += 6;
  });

  y += 2;

  // Let's create columns for Habilidades, Certificações and Idiomas to keep it beautifully structured
  // Column 1 X: marginX to 105mm, Column 2 X: 115mm to 190mm
  const col1X = marginX;
  const col2X = 112;
  const colWidth = 83; // (210 - 20 - 20 - 10) / 2

  let col1Y = y;
  let col2Y = y;

  // Draw Habilidades in Column 1
  col1Y = drawHeaderForColumn("HABILIDADES E COMPETÊNCIAS", col1X, col1Y);
  const skills = [
    "Flexibilidade para lidar com mudanças e novas demandas",
    "Perfil focado em resolução pragmática de problemas",
    "Domínio de metodologias ágeis (Scrum / XP)",
    "Boa gestão de tempo para priorização de prazos e tarefas",
    "Trabalho colaborativo e comunicação interpessoal qualificada"
  ];

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  skills.forEach((skill) => {
    const splitSkill = doc.splitTextToSize(`• ${skill}`, colWidth);
    doc.text(splitSkill, col1X, col1Y);
    col1Y += splitSkill.length * 4 + 1.5;
  });

  // Draw Idiomas on bottom of Column 1
  col1Y += 4;
  col1Y = drawHeaderForColumn("IDIOMAS", col1X, col1Y);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("Português:", col1X, col1Y);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text(" Língua materna", col1X + 17, col1Y);

  col1Y += 4.5;
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(blackText[0], blackText[1], blackText[2]);
  doc.text("Inglês:", col1X, col1Y);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  doc.text(" Intermediário (Nível B2)", col1X + 11, col1Y);

  // Draw Certificações in Column 2
  col2Y = drawHeaderForColumn("CERTIFICAÇÕES E CURSOS", col2X, col2Y);
  const certifications = [
    "TI Fundamentals: Hardware & Software",
    "C# Language - Basic",
    "Database Administration & Modeling",
    "ChatBot Construction and Customization",
    "Essential programming logic"
  ];

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(bodyGray[0], bodyGray[1], bodyGray[2]);
  certifications.forEach((cert) => {
    const splitCert = doc.splitTextToSize(`• ${cert}`, colWidth);
    doc.text(splitCert, col2X, col2Y);
    col2Y += splitCert.length * 4 + 1.5;
  });

  // Helper for subcolumn headers
  function drawHeaderForColumn(title: string, subX: number, subY: number) {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text(title, subX, subY);
    
    doc.setFillColor(15, 23, 42);
    doc.rect(subX - 3, subY - 3, 1.5, 3.5, "F");

    doc.setDrawColor(244, 244, 245);
    doc.line(subX, subY + 1.5, subX + colWidth, subY + 1.5);
    return subY + 5.5;
  }

  // Save/Download PDF
  doc.save("Curriculo_Davi_Rocha.pdf");
}
