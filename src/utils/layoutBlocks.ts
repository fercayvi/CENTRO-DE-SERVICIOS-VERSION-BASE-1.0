import { 
  LayoutBlock, 
  TextLayoutBlock, 
  AlertLayoutBlock, 
  FAQLayoutBlock, 
  MediaLayoutBlock, 
  ColumnsLayoutBlock, 
  ButtonLayoutBlock,
  DividerLayoutBlock,
  ColumnSlot, 
  Service,
  ServiceNodeContentData 
} from '../types';

export function generateBlockId(prefix: string = 'block'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export function createNewTextBlock(initialContent: string = ''): TextLayoutBlock {
  return {
    id: generateBlockId('txt'),
    type: 'text',
    title: '',
    content: initialContent || '',
    align: 'left',
    style: 'normal'
  };
}

export function createNewColumnsBlock(columnsCount: number = 2, layout: 'equal' | '1-2' | '2-1' = 'equal'): ColumnsLayoutBlock {
  const columns: ColumnSlot[] = Array.from({ length: columnsCount }, (_, i) => ({
    id: generateBlockId(`col_${i + 1}`),
    blocks: []
  }));

  return {
    id: generateBlockId('cols'),
    type: 'columns',
    columnsCount,
    layout,
    backgroundColor: 'white',
    columns
  };
}

export function createNewImageBlock(): MediaLayoutBlock {
  return {
    id: generateBlockId('img'),
    type: 'media',
    mediaType: 'image',
    title: '',
    url: '',
    caption: '',
    alignment: 'center',
    widthPercent: 100
  };
}

export function createNewButtonBlock(): ButtonLayoutBlock {
  return {
    id: generateBlockId('btn'),
    type: 'button',
    label: 'Consultar Información',
    url: '',
    style: 'primary',
    align: 'center'
  };
}

export function createNewDividerBlock(): DividerLayoutBlock {
  return {
    id: generateBlockId('div'),
    type: 'divider',
    lineStyle: 'solid',
    spacing: 'medium'
  };
}

export function createNewVideoBlock(): MediaLayoutBlock {
  return {
    id: generateBlockId('vid'),
    type: 'media',
    mediaType: 'video',
    title: 'Video Tutorial Explicativo',
    url: '',
    caption: ''
  };
}

export function createNewPdfBlock(): MediaLayoutBlock {
  return {
    id: generateBlockId('pdf'),
    type: 'media',
    mediaType: 'pdf',
    title: 'Descargar Formato Oficial (PDF)',
    url: '',
    caption: 'Haz clic para abrir o descargar el documento adjunto'
  };
}

export function createNewAlertBlock(): AlertLayoutBlock {
  return {
    id: generateBlockId('alt'),
    type: 'alert',
    level: 'warning',
    title: 'Aviso Importante',
    message: 'Escribe aquí la notificación o advertencia relevante para el personal...'
  };
}

export function createNewFAQBlock(): FAQLayoutBlock {
  return {
    id: generateBlockId('faq'),
    type: 'faq',
    title: 'Preguntas Frecuentes',
    items: [
      { q: '¿Cuál es el tiempo de respuesta estimado?', a: 'El trámite se procesa habitualmente en un lapso de 24 a 48 horas hábiles.' }
    ]
  };
}

export function createNewMediaBlock(): MediaLayoutBlock {
  return createNewImageBlock();
}

/**
 * Convierte los campos heredados de un trámite en bloques de layout modular.
 * Si el servicio ya cuenta con layoutBlocks, se devuelven intactos.
 */
export function ensureServiceLayoutBlocks(service: Partial<Service>): LayoutBlock[] {
  if (service.layoutBlocks && Array.isArray(service.layoutBlocks) && service.layoutBlocks.length > 0) {
    return service.layoutBlocks;
  }

  const blocks: LayoutBlock[] = [];

  // 1. Aviso de alerta previo
  if (typeof service.alertNotice === 'string' && service.alertNotice.trim().length > 0) {
    blocks.push({
      id: generateBlockId('alt'),
      type: 'alert',
      level: 'warning',
      title: 'Aviso Importante',
      message: service.alertNotice.trim()
    });
  }

  // 2. Imagen / Infografía previa
  if (typeof service.imageUrl === 'string' && service.imageUrl.trim().length > 0) {
    blocks.push({
      id: generateBlockId('med'),
      type: 'media',
      mediaType: 'image',
      title: 'Infografía del Procedimiento',
      url: service.imageUrl.trim(),
      caption: ''
    });
  }

  // 3. Video explicativo previo
  if (typeof service.videoUrl === 'string' && service.videoUrl.trim().length > 0) {
    blocks.push({
      id: generateBlockId('med'),
      type: 'media',
      mediaType: 'video',
      title: 'Video Tutorial Explicativo',
      url: service.videoUrl.trim(),
      caption: ''
    });
  }

  // 4. Formatos PDF / Documentos previos
  if (typeof service.pdfUrl === 'string' && service.pdfUrl.trim().length > 0) {
    blocks.push({
      id: generateBlockId('med'),
      type: 'media',
      mediaType: 'pdf',
      title: service.pdfTitle?.trim() || 'Formato Oficial para Descargar (PDF)',
      url: service.pdfUrl.trim(),
      caption: 'Descarga este formato oficial para presentar tu trámite'
    });
  }

  // 5. Pasos del procedimiento previos
  if (service.steps && service.steps.length > 0) {
    const stepsText = service.steps
      .map((st, i) => `${st.num || i + 1}. **${st.title || 'Paso'}**: ${st.desc}`)
      .join('\n\n');
    blocks.push({
      id: generateBlockId('txt'),
      type: 'text',
      title: 'Paso a Paso del Trámite',
      content: stepsText
    });
  }

  // 6. Requisitos previos
  if (service.requirements && service.requirements.length > 0) {
    const reqsText = service.requirements.map(req => `• ${req}`).join('\n');
    blocks.push({
      id: generateBlockId('txt'),
      type: 'text',
      title: 'Requisitos Necesarios',
      content: reqsText
    });
  }

  // 7. Atención y Ubicación previas
  const contactLines: string[] = [];
  if (service.location?.trim()) contactLines.push(`📍 **Ubicación**: ${service.location.trim()}`);
  if (service.schedule?.trim()) contactLines.push(`⏰ **Horario de Atención**: ${service.schedule.trim()}`);
  if (service.contact?.trim()) contactLines.push(`📞 **Contacto directo**: ${service.contact.trim()}`);

  if (contactLines.length > 0) {
    blocks.push({
      id: generateBlockId('txt'),
      type: 'text',
      title: 'Atención y Ubicación',
      content: contactLines.join('\n\n')
    });
  }

  // 8. Preguntas Frecuentes previas
  if (service.faqs && service.faqs.length > 0) {
    blocks.push({
      id: generateBlockId('faq'),
      type: 'faq',
      title: 'Preguntas Frecuentes',
      items: service.faqs.map(f => ({ q: f.question || '', a: f.answer || '' }))
    });
  }

  return blocks;
}

/**
 * Normaliza y recupera de forma segura los bloques editables de un nodo de árbol de decisiones.
 * Prioridad de resolución estricta contra pérdida de contenido:
 * 1. Bloques modernos existentes en node.blocks (si contienen elementos).
 * 2. Bloques modernos existentes en contentData.layoutBlocks (si contienen elementos).
 * 3. Conversión de contentData.blocks del formato legado al formato LayoutBlock[].
 * 4. Conversión de campos directos (text, imageUrl, videoUrl) de contentData o del nodo cuando tengan contenido.
 * 5. Si no existe contenido recuperable, devuelve un arreglo vacío.
 */
export function normalizeNodeLayoutBlocks(node?: {
  id?: string;
  blocks?: LayoutBlock[];
  contentData?: ServiceNodeContentData;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
} | null): LayoutBlock[] {
  if (!node) return [];

  // 1. Utilizar los bloques modernos existentes en ServiceNode.blocks, si contienen elementos.
  if (Array.isArray(node.blocks) && node.blocks.length > 0) {
    return node.blocks.map(b => ({ ...b }));
  }

  // 2. Si no existen, utilizar contentData.layoutBlocks, si contiene elementos.
  if (Array.isArray(node.contentData?.layoutBlocks) && node.contentData.layoutBlocks.length > 0) {
    return node.contentData.layoutBlocks.map(b => ({ ...b }));
  }

  // 3. Si tampoco existen, convertir contentData.blocks del formato legado al formato LayoutBlock[].
  if (Array.isArray(node.contentData?.blocks) && node.contentData.blocks.length > 0) {
    const convertedFromBlocks: LayoutBlock[] = [];
    node.contentData.blocks.forEach((b, idx) => {
      const stableSuffix = b.id ? (b.id.startsWith('b_') ? b.id : `b_${b.id}`) : `${node.id || 'blk'}_${idx}`;

      if (typeof b.text === 'string' && b.text.trim().length > 0) {
        convertedFromBlocks.push({
          id: `txt_${stableSuffix}`,
          type: 'text',
          content: b.text,
          align: 'left',
          style: 'normal'
        });
      }

      if (typeof b.imageUrl === 'string' && b.imageUrl.trim().length > 0) {
        convertedFromBlocks.push({
          id: `img_${stableSuffix}`,
          type: 'media',
          mediaType: 'image',
          url: b.imageUrl.trim(),
          size: 'full',
          alignment: 'center'
        });
      }

      if (typeof b.videoUrl === 'string' && b.videoUrl.trim().length > 0) {
        convertedFromBlocks.push({
          id: `vid_${stableSuffix}`,
          type: 'media',
          mediaType: 'video',
          url: b.videoUrl.trim(),
          size: 'full',
          alignment: 'center'
        });
      }
    });

    if (convertedFromBlocks.length > 0) {
      return convertedFromBlocks;
    }
  }

  // 4. Si no hay bloques en esos formatos, recuperar los campos directos de texto, imagen o video, cuando tengan contenido.
  const directText = (typeof node.contentData?.text === 'string' && node.contentData.text.trim().length > 0)
    ? node.contentData.text
    : (typeof node.text === 'string' && node.text.trim().length > 0 ? node.text : undefined);

  const directImageUrl = (typeof node.contentData?.imageUrl === 'string' && node.contentData.imageUrl.trim().length > 0)
    ? node.contentData.imageUrl.trim()
    : (typeof node.imageUrl === 'string' && node.imageUrl.trim().length > 0 ? node.imageUrl.trim() : undefined);

  const directVideoUrl = (typeof node.contentData?.videoUrl === 'string' && node.contentData.videoUrl.trim().length > 0)
    ? node.contentData.videoUrl.trim()
    : (typeof node.videoUrl === 'string' && node.videoUrl.trim().length > 0 ? node.videoUrl.trim() : undefined);

  const directBlocks: LayoutBlock[] = [];
  const nodeId = node.id || 'node';

  if (directText) {
    directBlocks.push({
      id: `txt_dir_${nodeId}`,
      type: 'text',
      content: directText,
      align: 'left',
      style: 'normal'
    });
  }

  if (directImageUrl) {
    directBlocks.push({
      id: `img_dir_${nodeId}`,
      type: 'media',
      mediaType: 'image',
      url: directImageUrl,
      size: 'full',
      alignment: 'center'
    });
  }

  if (directVideoUrl) {
    directBlocks.push({
      id: `vid_dir_${nodeId}`,
      type: 'media',
      mediaType: 'video',
      url: directVideoUrl,
      size: 'full',
      alignment: 'center'
    });
  }

  if (directBlocks.length > 0) {
    return directBlocks;
  }

  // 5. Si realmente no existe contenido, devolver un arreglo vacío.
  return [];
}

