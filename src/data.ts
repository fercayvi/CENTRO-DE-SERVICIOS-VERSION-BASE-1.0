import { ServiceId, Service, FAQ, NewsItem, Aviso, MonthlyRecognition, ContactInfo, CategoryConfig, SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  "defaultHomeView": "all_services"
};

export const defaultCategories: CategoryConfig[] = [
  {
    "id": "all",
    "label": "Todos los trámites",
    "defaultLabel": "Todos los trámites",
    "iconName": "LayoutGrid",
    "colorScheme": "indigo",
    "hidden": false
  },
  {
    "id": "nomina",
    "label": "Nómina y Pagos",
    "defaultLabel": "Nómina y Pagos",
    "iconName": "Wallet",
    "colorScheme": "emerald"
  },
  {
    "id": "tarjetas",
    "label": "Tarjetas y Créditos",
    "defaultLabel": "Tarjetas y Créditos",
    "iconName": "CreditCard",
    "colorScheme": "violet"
  },
  {
    "id": "control",
    "label": "Asistencia y Vacaciones",
    "defaultLabel": "Control y Asistencia",
    "iconName": "CalendarClock",
    "colorScheme": "amber"
  }
];

// Exportación compatible para componentes que usen activeCategories
export const activeCategories: CategoryConfig[] = defaultCategories;

export const initialContact: ContactInfo = {
  "whatsapp": "https://wa.me/525512345678",
  "telefono": "Ext. 202 (5512345678)",
  "ubicacion": "Módulo de Servicios al Personal, ubicado a un lado de Ropería.",
  "horario": "Lunes - Viernes: 7:00 am a 8:00 am | 9:00 am a 12:00 pm | 2:30 pm a 3:30 pm\nSábados: 9:30 am a 12:30 pm",
  "croquisUrl": ""
};

export const initialRecognitions: MonthlyRecognition[] = [];

export const recognitionData: MonthlyRecognition | undefined = initialRecognitions[0];

export const initialServices: Service[] = [
  {
    "id": "aclaracion_pago",
    "title": "Dudas con Mi Pago",
    "iconName": "HelpCircle",
    "icon": "HelpCircle",
    "shortDesc": "Contactos de Talento y Cultura, horarios de atención y FAQs sobre dudas de pago.",
    "category": "Nómina y Pagos",
    "fullDescription": "Contactos de Talento y Cultura, horarios de atención y FAQs sobre dudas de pago.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "tags": [
      "aclaración",
      "dudas",
      "pago",
      "descuentos",
      "retenciones",
      "fonacot",
      "recursos humanos",
      "rh",
      "sueldo"
    ],
    "hidden": false,
    "decisionTree": [],
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "layoutBlocks": []
  },
  {
    "id": "vacaciones",
    "title": "Vacaciones",
    "iconName": "Palmtree",
    "icon": "Palmtree",
    "shortDesc": "",
    "category": "Asistencia y Vacaciones",
    "fullDescription": "",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "hidden": false,
    "cardImage": "",
    "decisionTree": [],
    "layoutBlocks": [
      {
        "id": "btn_1790096656856_vqz6h",
        "type": "button",
        "label": "Solicita o consulta tus días de vacaciones",
        "url": "https://",
        "style": "primary",
        "align": "center"
      }
    ],
    "tags": [
      "vacaciones",
      "días disponibles",
      "descanso",
      "home week",
      "días flex",
      "prima vacacional",
      "solicitud",
      "permiso"
    ]
  },
  {
    "id": "politicas_pago",
    "title": "Días y Fechas de Pago",
    "iconName": "Banknote",
    "icon": "Banknote",
    "shortDesc": "Explicación de fechas de pago, periodicidad, conceptos aplicables y consultas frecuentes.",
    "category": "Nómina y Pagos",
    "fullDescription": "Explicación de fechas de pago, periodicidad, conceptos aplicables y consultas frecuentes.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "tags": [
      "pago",
      "sueldo",
      "salario",
      "fechas",
      "calendario",
      "depósito",
      "semanal",
      "quincenal",
      "dispersión"
    ],
    "hidden": true
  },
  {
    "id": "recibos_cif",
    "title": "Mis Recibos de Nómina",
    "iconName": "ReceiptText",
    "icon": "ReceiptText",
    "shortDesc": "Guía paso a paso para solicitar recibos impresos o digitales y consultar el Timbrado CIF.",
    "category": "Nómina y Pagos",
    "fullDescription": "",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "tags": [
      "recibos",
      "nómina",
      "timbrado",
      "cif",
      "sat",
      "comprobante",
      "constancia",
      "fiscal",
      "xml",
      "pdf",
      "descarga"
    ],
    "hidden": true
  },
  {
    "id": "vales_tarjeta_nomina",
    "title": "Mi Tarjeta y Vales",
    "iconName": "CreditCard",
    "icon": "CreditCard",
    "shortDesc": "Información sobre solicitud, uso, reposición por robo o extravío y FAQs.",
    "category": "Tarjetas y Créditos",
    "fullDescription": "Información sobre solicitud, uso, reposición por robo o extravío y FAQs.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "decisionTree": [
      {
        "id": "node_root_1",
        "title": "Tarjeta Vales de Despensa",
        "nodeType": "category",
        "children": [
          {
            "id": "node_1788446978640_awy8",
            "title": "¿Cómo registrar mi tarjeta?",
            "nodeType": "step",
            "text": "1. Descarga la aplicación oficial Edenred en tu celular.\n",
            "children": [
              {
                "id": "node_1788447025718_4lto",
                "title": "Opción",
                "nodeType": "step",
                "text": "2. Selecciona la opción “Regístrate”",
                "children": [
                  {
                    "id": "node_1788447179506_x8rv",
                    "title": "Opción",
                    "nodeType": "step",
                    "text": "3. Ingresa tu correo electrónico y crea una contraseña segura\n",
                    "children": [
                      {
                        "id": "node_1788447195454_x0fa",
                        "title": "Opción",
                        "nodeType": "step",
                        "text": "4. Coloca tu nombre y apellido, adicional selecciona la casilla del aviso de privacidad",
                        "children": [
                          {
                            "id": "node_1788447209926_h15m",
                            "title": "Opción",
                            "nodeType": "step",
                            "text": "5. Confirma tu cuenta ingresando el código de verificación que recibirás en el correo electrónico registrado.\n",
                            "children": [
                              {
                                "id": "node_1788447230371_g53k",
                                "title": "Opción",
                                "nodeType": "step",
                                "text": "6. Ingresa los datos adicionales que solicite la aplicación, como:\nFecha de vencimiento.\nCódigo de seguridad CVV, ubicado en la parte posterior de tu tarjeta.\n",
                                "children": [],
                                "blocks": [
                                  {
                                    "id": "txt_b_block_node_1788447230371_g53k_1",
                                    "type": "text",
                                    "content": "<b>6. Ingresa los datos adicionales que solicite la aplicación, como:\nFecha de vencimiento.\nCódigo de seguridad CVV, ubicado en la parte posterior de tu tarjeta.</b>\n",
                                    "align": "left",
                                    "style": "normal"
                                  },
                                  {
                                    "id": "img_1792593216660_hm3ls",
                                    "type": "media",
                                    "mediaType": "image",
                                    "title": "",
                                    "url": "/1792593223186-7.png",
                                    "caption": "",
                                    "alignment": "center",
                                    "widthPercent": 100
                                  }
                                ],
                                "contentData": {
                                  "text": "6. Ingresa los datos adicionales que solicite la aplicación, como:\nFecha de vencimiento.\nCódigo de seguridad CVV, ubicado en la parte posterior de tu tarjeta.\n",
                                  "imageUrl": "",
                                  "videoUrl": "",
                                  "layoutBlocks": [
                                    {
                                      "id": "txt_b_block_node_1788447230371_g53k_1",
                                      "type": "text",
                                      "content": "<b>6. Ingresa los datos adicionales que solicite la aplicación, como:\nFecha de vencimiento.\nCódigo de seguridad CVV, ubicado en la parte posterior de tu tarjeta.</b>\n",
                                      "align": "left",
                                      "style": "normal"
                                    },
                                    {
                                      "id": "img_1792593216660_hm3ls",
                                      "type": "media",
                                      "mediaType": "image",
                                      "title": "",
                                      "url": "/1792593223186-7.png",
                                      "caption": "",
                                      "alignment": "center",
                                      "widthPercent": 100
                                    }
                                  ]
                                }
                              }
                            ],
                            "blocks": [
                              {
                                "id": "txt_b_block_node_1788447209926_h15m_1",
                                "type": "text",
                                "content": "<b>5. Confirma tu cuenta ingresando el código de verificación que recibirás en el correo electrónico registrado.</b>\n",
                                "align": "left",
                                "style": "normal"
                              },
                              {
                                "id": "img_1792593199461_mvyif",
                                "type": "media",
                                "mediaType": "image",
                                "title": "",
                                "url": "/1792593204728-6.png",
                                "caption": "",
                                "alignment": "center",
                                "widthPercent": 100
                              }
                            ],
                            "contentData": {
                              "text": "5. Confirma tu cuenta ingresando el código de verificación que recibirás en el correo electrónico registrado.\n",
                              "imageUrl": "",
                              "videoUrl": "",
                              "layoutBlocks": [
                                {
                                  "id": "txt_b_block_node_1788447209926_h15m_1",
                                  "type": "text",
                                  "content": "<b>5. Confirma tu cuenta ingresando el código de verificación que recibirás en el correo electrónico registrado.</b>\n",
                                  "align": "left",
                                  "style": "normal"
                                },
                                {
                                  "id": "img_1792593199461_mvyif",
                                  "type": "media",
                                  "mediaType": "image",
                                  "title": "",
                                  "url": "/1792593204728-6.png",
                                  "caption": "",
                                  "alignment": "center",
                                  "widthPercent": 100
                                }
                              ]
                            }
                          }
                        ],
                        "blocks": [
                          {
                            "id": "txt_b_block_node_1788447195454_x0fa_1",
                            "type": "text",
                            "content": "<b>4. Coloca tu nombre y apellido, adicional selecciona la casilla del aviso de privacidad</b>",
                            "align": "left",
                            "style": "normal"
                          },
                          {
                            "id": "img_1792593186221_oqry6",
                            "type": "media",
                            "mediaType": "image",
                            "title": "",
                            "url": "/1792593191517-5.png",
                            "caption": "",
                            "alignment": "center",
                            "widthPercent": 100
                          }
                        ],
                        "contentData": {
                          "text": "4. Coloca tu nombre y apellido, adicional selecciona la casilla del aviso de privacidad",
                          "imageUrl": "",
                          "videoUrl": "",
                          "layoutBlocks": [
                            {
                              "id": "txt_b_block_node_1788447195454_x0fa_1",
                              "type": "text",
                              "content": "<b>4. Coloca tu nombre y apellido, adicional selecciona la casilla del aviso de privacidad</b>",
                              "align": "left",
                              "style": "normal"
                            },
                            {
                              "id": "img_1792593186221_oqry6",
                              "type": "media",
                              "mediaType": "image",
                              "title": "",
                              "url": "/1792593191517-5.png",
                              "caption": "",
                              "alignment": "center",
                              "widthPercent": 100
                            }
                          ]
                        }
                      }
                    ],
                    "blocks": [
                      {
                        "id": "txt_b_block_node_1788447179506_x8rv_1",
                        "type": "text",
                        "content": "<b>3. Ingresa tu correo electrónico y crea una contraseña segura</b>\n",
                        "align": "left",
                        "style": "normal"
                      },
                      {
                        "id": "img_1792590399074_7aj4r",
                        "type": "media",
                        "mediaType": "image",
                        "title": "",
                        "url": "/1792593172632-4.png",
                        "caption": "",
                        "alignment": "center",
                        "widthPercent": 100
                      }
                    ],
                    "contentData": {
                      "text": "3. Ingresa tu correo electrónico y crea una contraseña segura\n",
                      "imageUrl": "",
                      "videoUrl": "",
                      "layoutBlocks": [
                        {
                          "id": "txt_b_block_node_1788447179506_x8rv_1",
                          "type": "text",
                          "content": "<b>3. Ingresa tu correo electrónico y crea una contraseña segura</b>\n",
                          "align": "left",
                          "style": "normal"
                        },
                        {
                          "id": "img_1792590399074_7aj4r",
                          "type": "media",
                          "mediaType": "image",
                          "title": "",
                          "url": "/1792593172632-4.png",
                          "caption": "",
                          "alignment": "center",
                          "widthPercent": 100
                        }
                      ]
                    }
                  }
                ],
                "blocks": [
                  {
                    "id": "txt_b_block_node_1788447025718_4lto_1",
                    "type": "text",
                    "content": "<b>2. Selecciona la opción “Regístrate”</b>",
                    "align": "left",
                    "style": "normal"
                  },
                  {
                    "id": "img_1792590372938_5gv57",
                    "type": "media",
                    "mediaType": "image",
                    "title": "",
                    "url": "/1792593161024-3.png",
                    "caption": "",
                    "alignment": "center",
                    "widthPercent": 100
                  }
                ],
                "contentData": {
                  "text": "2. Selecciona la opción “Regístrate”",
                  "imageUrl": "",
                  "videoUrl": "",
                  "layoutBlocks": [
                    {
                      "id": "txt_b_block_node_1788447025718_4lto_1",
                      "type": "text",
                      "content": "<b>2. Selecciona la opción “Regístrate”</b>",
                      "align": "left",
                      "style": "normal"
                    },
                    {
                      "id": "img_1792590372938_5gv57",
                      "type": "media",
                      "mediaType": "image",
                      "title": "",
                      "url": "/1792593161024-3.png",
                      "caption": "",
                      "alignment": "center",
                      "widthPercent": 100
                    }
                  ]
                }
              }
            ],
            "blocks": [
              {
                "id": "txt_b_block_node_1788446978640_awy8_1",
                "type": "text",
                "content": "<b>1. Descarga la aplicación oficial Edenred en tu celular.</b>\n",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "img_1792590339173_c8ej0",
                "type": "media",
                "mediaType": "image",
                "title": "",
                "url": "/1792593147892-2.png",
                "caption": "",
                "alignment": "center",
                "widthPercent": 100
              }
            ],
            "contentData": {
              "text": "1. Descarga la aplicación oficial Edenred en tu celular.\n",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_b_block_node_1788446978640_awy8_1",
                  "type": "text",
                  "content": "<b>1. Descarga la aplicación oficial Edenred en tu celular.</b>\n",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "img_1792590339173_c8ej0",
                  "type": "media",
                  "mediaType": "image",
                  "title": "",
                  "url": "/1792593147892-2.png",
                  "caption": "",
                  "alignment": "center",
                  "widthPercent": 100
                }
              ]
            }
          },
          {
            "id": "node_1788447363434_2vxs",
            "title": "¿Dónde puedo utilizarla?",
            "nodeType": "content",
            "blocks": [
              {
                "id": "txt_1792706388232_k52tm",
                "type": "text",
                "title": "",
                "content": "<p>Edenred cuenta con una amplia red de establecimientos afiliados en México, incluyendo:<b><br></b></p>",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "img_1792706335045_l8iyb",
                "type": "media",
                "mediaType": "image",
                "title": "",
                "url": "/1792706364553-Captura-de-pantalla-2026-10-22-155615.png",
                "caption": "",
                "alignment": "center",
                "widthPercent": 100
              },
              {
                "id": "alt_1792706411428_6qs0v",
                "type": "alert",
                "level": "warning",
                "title": "Aviso Importante",
                "message": " La aceptación de la tarjeta puede variar según el establecimiento y la terminal disponible. Si un establecimiento no cuenta con terminal Edenred o la tarjeta no es aceptada, puedes intentar realizar tu compra en otra sucursal o establecimiento afiliado.\n"
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1792706388232_k52tm",
                  "type": "text",
                  "title": "",
                  "content": "<p>Edenred cuenta con una amplia red de establecimientos afiliados en México, incluyendo:<b><br></b></p>",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "img_1792706335045_l8iyb",
                  "type": "media",
                  "mediaType": "image",
                  "title": "",
                  "url": "/1792706364553-Captura-de-pantalla-2026-10-22-155615.png",
                  "caption": "",
                  "alignment": "center",
                  "widthPercent": 100
                },
                {
                  "id": "alt_1792706411428_6qs0v",
                  "type": "alert",
                  "level": "warning",
                  "title": "Aviso Importante",
                  "message": " La aceptación de la tarjeta puede variar según el establecimiento y la terminal disponible. Si un establecimiento no cuenta con terminal Edenred o la tarjeta no es aceptada, puedes intentar realizar tu compra en otra sucursal o establecimiento afiliado.\n"
                }
              ]
            }
          },
          {
            "id": "node_1788456110529_r8d1",
            "title": "¿Cómo puedo obtenerlo?   ",
            "nodeType": "content",
            "blocks": [
              {
                "id": "txt_1792707521425_jmq1l",
                "type": "text",
                "title": "¿Cómo ser acreedor al Vale de Despensa mensual?",
                "content": "<p>El monto del beneficio dependerá de las faltas registradas durante el periodo correspondiente:<b><br></b></p>",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "cols_1792707552249_i2abt",
                "type": "columns",
                "columnsCount": 2,
                "layout": "equal",
                "backgroundColor": "white",
                "columns": [
                  {
                    "id": "col_1_1792707552249_9oxil",
                    "blocks": [
                      {
                        "id": "txt_1792707557194_83d94",
                        "type": "text",
                        "title": "",
                        "content": "<p><b>Faltas durante el periodo</b></p><p>Sin faltas</p><p>1 falta</p><p>2 o más faltas<b><br></b></p>",
                        "align": "center",
                        "style": "normal"
                      }
                    ]
                  },
                  {
                    "id": "col_2_1792707552249_g7v3f",
                    "blocks": [
                      {
                        "id": "txt_1792707558500_u58e1",
                        "type": "text",
                        "title": "",
                        "content": "<p><b>Vale de despensa</b></p><p>$800</p><p>$600</p><p> No eres acreedor al beneficio<b><br></b></p>",
                        "align": "center",
                        "style": "normal"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "alt_1792707690957_pyeim",
                "type": "alert",
                "level": "warning",
                "title": "Aviso Importante",
                "message": "Si tienes alguna duda o consideras que existe un error en tus faltas, acude al Módulo de Atención, ubicado a un costado de la Ropería.\n\nRecuerda aclarar cualquier incidencia con tu supervisor inmediato y mantenerte al pendiente de tus registros durante el periodo correspondiente.\n"
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1792707521425_jmq1l",
                  "type": "text",
                  "title": "¿Cómo ser acreedor al Vale de Despensa mensual?",
                  "content": "<p>El monto del beneficio dependerá de las faltas registradas durante el periodo correspondiente:<b><br></b></p>",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "cols_1792707552249_i2abt",
                  "type": "columns",
                  "columnsCount": 2,
                  "layout": "equal",
                  "backgroundColor": "white",
                  "columns": [
                    {
                      "id": "col_1_1792707552249_9oxil",
                      "blocks": [
                        {
                          "id": "txt_1792707557194_83d94",
                          "type": "text",
                          "title": "",
                          "content": "<p><b>Faltas durante el periodo</b></p><p>Sin faltas</p><p>1 falta</p><p>2 o más faltas<b><br></b></p>",
                          "align": "center",
                          "style": "normal"
                        }
                      ]
                    },
                    {
                      "id": "col_2_1792707552249_g7v3f",
                      "blocks": [
                        {
                          "id": "txt_1792707558500_u58e1",
                          "type": "text",
                          "title": "",
                          "content": "<p><b>Vale de despensa</b></p><p>$800</p><p>$600</p><p> No eres acreedor al beneficio<b><br></b></p>",
                          "align": "center",
                          "style": "normal"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "alt_1792707690957_pyeim",
                  "type": "alert",
                  "level": "warning",
                  "title": "Aviso Importante",
                  "message": "Si tienes alguna duda o consideras que existe un error en tus faltas, acude al Módulo de Atención, ubicado a un costado de la Ropería.\n\nRecuerda aclarar cualquier incidencia con tu supervisor inmediato y mantenerte al pendiente de tus registros durante el periodo correspondiente.\n"
                }
              ]
            }
          },
          {
            "id": "node_1788456194021_kelg",
            "title": "Necesito una reposición",
            "nodeType": "content",
            "text": " Acude al Módulo de Servicio al Personal para realizar el trámite.\n\nSolicita tu reposición por un costo de $49 MXN.\n\n",
            "blocks": [
              {
                "id": "txt_b_block_node_1788456194021_kelg_1",
                "type": "text",
                "content": "Solicita tu reposición por un<b> costo de $49 MXN</b>.<p><br></p><p>Acude al <b>Módulo de Servicio al Personal  </b>ubicado a un lado de ropería para realizar el trámite.</p><p><br></p><p></p><p><b>Horario de atención: </b>Lunes - Viernes: 7:00 am a 8:00 am | 9:00 am a 12:00 pm | 2:30 pm a 3:30 pm - Sábados: 9:30 am a 12:30 pm</p><p></p><p></p><p></p>",
                "align": "left",
                "style": "normal",
                "title": "¿Necesitas reponer tu tarjeta de vales de despensa?"
              }
            ],
            "contentData": {
              "text": " Acude al Módulo de Servicio al Personal para realizar el trámite.\n\nSolicita tu reposici��n por un costo de $49 MXN.\n\n",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_b_block_node_1788456194021_kelg_1",
                  "type": "text",
                  "content": "Solicita tu reposición por un<b> costo de $49 MXN</b>.<p><br></p><p>Acude al <b>Módulo de Servicio al Personal  </b>ubicado a un lado de ropería para realizar el trámite.</p><p><br></p><p></p><p><b>Horario de atención: </b>Lunes - Viernes: 7:00 am a 8:00 am | 9:00 am a 12:00 pm | 2:30 pm a 3:30 pm - Sábados: 9:30 am a 12:30 pm</p><p></p><p></p><p></p>",
                  "align": "left",
                  "style": "normal",
                  "title": "¿Necesitas reponer tu tarjeta de vales de despensa?"
                }
              ]
            }
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": ""
        }
      },
      {
        "id": "node_1788446917593_gy9a",
        "title": "Tarjeta de Nómina",
        "nodeType": "category",
        "children": [
          {
            "id": "node_1792708530841_9ioz",
            "title": "¿Cómo recoger y activar tu tarjeta Banorte?",
            "nodeType": "content",
            "blocks": [
              {
                "id": "txt_1792775722444_5cx6j",
                "type": "text",
                "title": "¿Dónde recogerla?",
                "content": "Recógela en el<b> Módulo de Servicio al Personal,</b> ubicado entre Talento<br>y Cultura y Ropería.",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "txt_1792775819826_w8w9n",
                "type": "text",
                "title": "Horarios de atención: ",
                "content": "<p>Jueves y/o Viernes </p><p>6:30 a.m.– 7:30 a.m. </p><p>9:00 a.m.– 12:00 p.m.</p><p></p><p></p>",
                "align": "center",
                "style": "normal"
              },
              {
                "id": "txt_1792776142823_5skk7",
                "type": "text",
                "title": "¿Cómo puedes activarla?",
                "content": "<ul><li>Inserta tu tarjeta en cualquier cajero automático.</li><li>Ingresa el NIP que aparece en el desprendible de la tarjeta.</li><li>El cajero automático te solicitará cambiar el NIP por uno.</li><li>nuevo que solo tú conozcas.</li></ul><p></p>",
                "align": "left",
                "style": "normal"
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1792775722444_5cx6j",
                  "type": "text",
                  "title": "¿Dónde recogerla?",
                  "content": "Recógela en el<b> Módulo de Servicio al Personal,</b> ubicado entre Talento<br>y Cultura y Ropería.",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "txt_1792775819826_w8w9n",
                  "type": "text",
                  "title": "Horarios de atención: ",
                  "content": "<p>Jueves y/o Viernes </p><p>6:30 a.m.– 7:30 a.m. </p><p>9:00 a.m.– 12:00 p.m.</p><p></p><p></p>",
                  "align": "center",
                  "style": "normal"
                },
                {
                  "id": "txt_1792776142823_5skk7",
                  "type": "text",
                  "title": "¿Cómo puedes activarla?",
                  "content": "<ul><li>Inserta tu tarjeta en cualquier cajero automático.</li><li>Ingresa el NIP que aparece en el desprendible de la tarjeta.</li><li>El cajero automático te solicitará cambiar el NIP por uno.</li><li>nuevo que solo tú conozcas.</li></ul><p></p>",
                  "align": "left",
                  "style": "normal"
                }
              ]
            }
          },
          {
            "id": "node_1792708543192_5l3p",
            "title": "¿Cómo descargar Banorte Móvil?",
            "nodeType": "content",
            "blocks": [
              {
                "id": "txt_1793226346287_jgizv",
                "type": "text",
                "title": "¿Cómo descargar Banorte Móvil?",
                "content": "Registra y administra tu tarjeta desde la app:\n",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "cols_1793226327144_pzsb4",
                "type": "columns",
                "columnsCount": 3,
                "layout": "equal",
                "backgroundColor": "white",
                "columns": [
                  {
                    "id": "col_1_1793226327143_1k34c",
                    "blocks": [
                      {
                        "id": "txt_1793226382174_5eti1",
                        "type": "text",
                        "title": "Descarga",
                        "content": "Descarga Banorte Móvil y selecciona “Registrarme”.\n",
                        "align": "left",
                        "style": "normal"
                      }
                    ]
                  },
                  {
                    "id": "col_2_1793226327144_t7f1a",
                    "blocks": [
                      {
                        "id": "txt_1793226383759_wrwen",
                        "type": "text",
                        "title": "Ingresa tu numero de tarjeta",
                        "content": "Ingresa tu número de tarjeta de nómina y captura los datos solicitados.\n",
                        "align": "left",
                        "style": "normal"
                      }
                    ]
                  },
                  {
                    "id": "col_3_1793226327144_krrfy",
                    "blocks": [
                      {
                        "id": "txt_1793226385561_4ax6v",
                        "type": "text",
                        "title": "Crea usuario y contraseña",
                        "content": "Crea tu usuario y contraseña, e ingresa el código de activación que recibirás por SMS\n",
                        "align": "left",
                        "style": "normal"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "txt_1793226508278_3wzrm",
                "type": "text",
                "title": "¿Cuándo recibo mi nómina?",
                "content": "<ul data-spread=\"false\" data-pm-slice=\"3 1 []\"><li><p><strong>Pago semanal:</strong> todos los viernes, después del mediodía.</p></li><li><p><strong>Pago quincenal:</strong> los días 15 y 30 de cada mes.</p></li></ul><p>Tu nómina se deposita directamente en tu cuenta bancaria.<br></p>",
                "align": "left",
                "style": "normal"
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1793226346287_jgizv",
                  "type": "text",
                  "title": "¿Cómo descargar Banorte Móvil?",
                  "content": "Registra y administra tu tarjeta desde la app:\n",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "cols_1793226327144_pzsb4",
                  "type": "columns",
                  "columnsCount": 3,
                  "layout": "equal",
                  "backgroundColor": "white",
                  "columns": [
                    {
                      "id": "col_1_1793226327143_1k34c",
                      "blocks": [
                        {
                          "id": "txt_1793226382174_5eti1",
                          "type": "text",
                          "title": "Descarga",
                          "content": "Descarga Banorte Móvil y selecciona “Registrarme”.\n",
                          "align": "left",
                          "style": "normal"
                        }
                      ]
                    },
                    {
                      "id": "col_2_1793226327144_t7f1a",
                      "blocks": [
                        {
                          "id": "txt_1793226383759_wrwen",
                          "type": "text",
                          "title": "Ingresa tu numero de tarjeta",
                          "content": "Ingresa tu número de tarjeta de nómina y captura los datos solicitados.\n",
                          "align": "left",
                          "style": "normal"
                        }
                      ]
                    },
                    {
                      "id": "col_3_1793226327144_krrfy",
                      "blocks": [
                        {
                          "id": "txt_1793226385561_4ax6v",
                          "type": "text",
                          "title": "Crea usuario y contraseña",
                          "content": "Crea tu usuario y contraseña, e ingresa el código de activación que recibirás por SMS\n",
                          "align": "left",
                          "style": "normal"
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "txt_1793226508278_3wzrm",
                  "type": "text",
                  "title": "¿Cuándo recibo mi nómina?",
                  "content": "<ul data-spread=\"false\" data-pm-slice=\"3 1 []\"><li><p><strong>Pago semanal:</strong> todos los viernes, después del mediodía.</p></li><li><p><strong>Pago quincenal:</strong> los días 15 y 30 de cada mes.</p></li></ul><p>Tu nómina se deposita directamente en tu cuenta bancaria.<br></p>",
                  "align": "left",
                  "style": "normal"
                }
              ]
            }
          },
          {
            "id": "node_1792708603174_a2lj",
            "title": "¿Cómo asociar una nueva tarjeta Banorte?",
            "nodeType": "content",
            "blocks": [
              {
                "id": "txt_1793225930551_4dq6u",
                "type": "text",
                "title": "Si recibiste una nueva tarjeta, sigue estos pasos para vincularla a tu cuenta en Banorte Móvil.",
                "content": "<p data-pm-slice=\"1 3 []\"><strong>Pasos a seguir:</strong></p><ol data-spread=\"false\"><li><p><strong>Ingresa a Banorte Móvil:</strong> inicia sesión con tu usuario y contraseña.</p></li><li><p><strong>Selecciona tu cuenta:</strong> entra al apartado de Ajustes.</p></li><li><p><strong>Asocia tu tarjeta:</strong> selecciona la opción «Asociar Tarjeta».</p></li><li><p><strong>Ingresa los datos:</strong> captura los 16 dígitos de tu nueva tarjeta.</p></li><li><p><strong>Confirma la activación:</strong> verifica que la tarjeta aparezca vinculada a tu cuenta.<br></p></li></ol>",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "alt_1793225961306_9r0kt",
                "type": "alert",
                "level": "warning",
                "title": "Aviso Importante",
                "message": "Si recibiste una nueva tarjeta, revisa si necesitas asociarla nuevamente en Banorte Móvil para mantenerla vinculada a tu cuenta."
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1793225930551_4dq6u",
                  "type": "text",
                  "title": "Si recibiste una nueva tarjeta, sigue estos pasos para vincularla a tu cuenta en Banorte Móvil.",
                  "content": "<p data-pm-slice=\"1 3 []\"><strong>Pasos a seguir:</strong></p><ol data-spread=\"false\"><li><p><strong>Ingresa a Banorte Móvil:</strong> inicia sesión con tu usuario y contraseña.</p></li><li><p><strong>Selecciona tu cuenta:</strong> entra al apartado de Ajustes.</p></li><li><p><strong>Asocia tu tarjeta:</strong> selecciona la opción «Asociar Tarjeta».</p></li><li><p><strong>Ingresa los datos:</strong> captura los 16 dígitos de tu nueva tarjeta.</p></li><li><p><strong>Confirma la activación:</strong> verifica que la tarjeta aparezca vinculada a tu cuenta.<br></p></li></ol>",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "alt_1793225961306_9r0kt",
                  "type": "alert",
                  "level": "warning",
                  "title": "Aviso Importante",
                  "message": "Si recibiste una nueva tarjeta, revisa si necesitas asociarla nuevamente en Banorte Móvil para mantenerla vinculada a tu cuenta."
                }
              ]
            }
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": ""
        }
      }
    ],
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "tags": [
      "vales",
      "despensa",
      "tarjeta",
      "plástico",
      "reposición",
      "nip",
      "saldo",
      "compras",
      "robo",
      "extravío"
    ],
    "hidden": false,
    "layoutBlocks": []
  },
  {
    "id": "caja_ahorro",
    "title": "Préstamos y Ahorro",
    "iconName": "PiggyBank",
    "icon": "PiggyBank",
    "shortDesc": "Reglas de acceso a la caja de ahorro, tipos de préstamos y procedimiento de solicitud informativa.",
    "category": "Tarjetas y Créditos",
    "fullDescription": "",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "tags": [
      "préstamos",
      "ahorro",
      "caja de ahorro",
      "fondo",
      "intereses",
      "financiamiento",
      "solicitud",
      "crédito"
    ],
    "hidden": true
  },
  {
    "id": "infonavit",
    "title": "INFONAVIT",
    "iconName": "Home",
    "icon": "Home",
    "shortDesc": "Información de descuentos, retención de crédito y preguntas frecuentes.",
    "category": "Tarjetas y Créditos",
    "fullDescription": "Información de descuentos, retención de crédito y preguntas frecuentes.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "tags": [
      "infonavit",
      "crédito",
      "vivienda",
      "retención",
      "aviso",
      "descuento",
      "casa",
      "hipotecario",
      "constancia"
    ],
    "hidden": false,
    "decisionTree": [
      {
        "id": "node_root_1",
        "title": "¿Cómo crear mi cuenta Infonavit?",
        "nodeType": "step",
        "children": [
          {
            "id": "node_1793125750898_t6xp",
            "title": "Iniciar registro",
            "nodeType": "step",
            "children": [
              {
                "id": "node_1793125755944_0j42",
                "title": "Ingresar datos personales",
                "nodeType": "step",
                "children": [
                  {
                    "id": "node_1793125756454_ehur",
                    "title": "Verificar tu nombre",
                    "nodeType": "step",
                    "children": [
                      {
                        "id": "node_1793125757098_w2q0",
                        "title": "Añadir datos de contacto",
                        "nodeType": "step",
                        "children": [
                          {
                            "id": "node_1793125757621_hrfl",
                            "title": "Aceptar condiciones legales",
                            "nodeType": "step",
                            "children": [
                              {
                                "id": "node_1793125758124_ja0w",
                                "title": "Crear contraseña",
                                "nodeType": "step",
                                "children": [
                                  {
                                    "id": "node_1793125758565_xpet",
                                    "title": "Activar la cuenta",
                                    "nodeType": "step",
                                    "children": [
                                      {
                                        "id": "node_1793125758900_nbpm",
                                        "title": "Finalizar",
                                        "nodeType": "step",
                                        "children": [],
                                        "blocks": [
                                          {
                                            "id": "txt_1793126896541_xfid7",
                                            "type": "text",
                                            "title": "",
                                            "content": "<b>Confirma la activación y haz clic en el botón Finalizar para acceder a tu cuenta.</b>",
                                            "align": "left",
                                            "style": "normal"
                                          },
                                          {
                                            "id": "img_1793126902791_0y79g",
                                            "type": "media",
                                            "mediaType": "image",
                                            "title": "",
                                            "url": "/1793126907283-Captura-de-pantalla-2026-10-27-121502.png",
                                            "caption": "",
                                            "alignment": "center",
                                            "widthPercent": 100
                                          }
                                        ],
                                        "contentData": {
                                          "text": "",
                                          "imageUrl": "",
                                          "videoUrl": "",
                                          "layoutBlocks": [
                                            {
                                              "id": "txt_1793126896541_xfid7",
                                              "type": "text",
                                              "title": "",
                                              "content": "<b>Confirma la activación y haz clic en el botón Finalizar para acceder a tu cuenta.</b>",
                                              "align": "left",
                                              "style": "normal"
                                            },
                                            {
                                              "id": "img_1793126902791_0y79g",
                                              "type": "media",
                                              "mediaType": "image",
                                              "title": "",
                                              "url": "/1793126907283-Captura-de-pantalla-2026-10-27-121502.png",
                                              "caption": "",
                                              "alignment": "center",
                                              "widthPercent": 100
                                            }
                                          ]
                                        }
                                      }
                                    ],
                                    "blocks": [
                                      {
                                        "id": "txt_1793126809456_b9sar",
                                        "type": "text",
                                        "title": "",
                                        "content": "<b>Abre el enlace o aviso enviado a tu correo electrónico e ingresa el código numérico recibido vía SMS en tu celular.</b>",
                                        "align": "left",
                                        "style": "normal"
                                      },
                                      {
                                        "id": "cols_1793126828605_r5ctb",
                                        "type": "columns",
                                        "columnsCount": 2,
                                        "layout": "equal",
                                        "backgroundColor": "white",
                                        "columns": [
                                          {
                                            "id": "col_1_1793126828605_v5d7w",
                                            "blocks": [
                                              {
                                                "id": "img_1793126831544_2ksv5",
                                                "type": "media",
                                                "mediaType": "image",
                                                "title": "",
                                                "url": "/1793126839578-Captura-de-pantalla-2026-10-27-121027.png",
                                                "caption": "",
                                                "alignment": "center",
                                                "widthPercent": 100
                                              }
                                            ]
                                          },
                                          {
                                            "id": "col_2_1793126828605_irrpq",
                                            "blocks": [
                                              {
                                                "id": "img_1793126833096_svz4f",
                                                "type": "media",
                                                "mediaType": "image",
                                                "title": "",
                                                "url": "/1793126844427-Captura-de-pantalla-2026-10-27-121431.png",
                                                "caption": "",
                                                "alignment": "center",
                                                "widthPercent": 100
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ],
                                    "contentData": {
                                      "text": "",
                                      "imageUrl": "",
                                      "videoUrl": "",
                                      "layoutBlocks": [
                                        {
                                          "id": "txt_1793126809456_b9sar",
                                          "type": "text",
                                          "title": "",
                                          "content": "<b>Abre el enlace o aviso enviado a tu correo electrónico e ingresa el código numérico recibido vía SMS en tu celular.</b>",
                                          "align": "left",
                                          "style": "normal"
                                        },
                                        {
                                          "id": "cols_1793126828605_r5ctb",
                                          "type": "columns",
                                          "columnsCount": 2,
                                          "layout": "equal",
                                          "backgroundColor": "white",
                                          "columns": [
                                            {
                                              "id": "col_1_1793126828605_v5d7w",
                                              "blocks": [
                                                {
                                                  "id": "img_1793126831544_2ksv5",
                                                  "type": "media",
                                                  "mediaType": "image",
                                                  "title": "",
                                                  "url": "/1793126839578-Captura-de-pantalla-2026-10-27-121027.png",
                                                  "caption": "",
                                                  "alignment": "center",
                                                  "widthPercent": 100
                                                }
                                              ]
                                            },
                                            {
                                              "id": "col_2_1793126828605_irrpq",
                                              "blocks": [
                                                {
                                                  "id": "img_1793126833096_svz4f",
                                                  "type": "media",
                                                  "mediaType": "image",
                                                  "title": "",
                                                  "url": "/1793126844427-Captura-de-pantalla-2026-10-27-121431.png",
                                                  "caption": "",
                                                  "alignment": "center",
                                                  "widthPercent": 100
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  }
                                ],
                                "blocks": [
                                  {
                                    "id": "txt_1793126768249_9ojp7",
                                    "type": "text",
                                    "title": "",
                                    "content": "<b>Establece y confirma tu contraseña siguiendo los requisitos de longitud y caracteres solicitados.</b>",
                                    "align": "left",
                                    "style": "normal"
                                  },
                                  {
                                    "id": "img_1793126776574_72ep9",
                                    "type": "media",
                                    "mediaType": "image",
                                    "title": "",
                                    "url": "/1793126782055-Captura-de-pantalla-2026-10-27-120934.png",
                                    "caption": "",
                                    "alignment": "center",
                                    "widthPercent": 100
                                  }
                                ],
                                "contentData": {
                                  "text": "",
                                  "imageUrl": "",
                                  "videoUrl": "",
                                  "layoutBlocks": [
                                    {
                                      "id": "txt_1793126768249_9ojp7",
                                      "type": "text",
                                      "title": "",
                                      "content": "<b>Establece y confirma tu contraseña siguiendo los requisitos de longitud y caracteres solicitados.</b>",
                                      "align": "left",
                                      "style": "normal"
                                    },
                                    {
                                      "id": "img_1793126776574_72ep9",
                                      "type": "media",
                                      "mediaType": "image",
                                      "title": "",
                                      "url": "/1793126782055-Captura-de-pantalla-2026-10-27-120934.png",
                                      "caption": "",
                                      "alignment": "center",
                                      "widthPercent": 100
                                    }
                                  ]
                                }
                              }
                            ],
                            "blocks": [
                              {
                                "id": "txt_1793126695707_um193",
                                "type": "text",
                                "title": "",
                                "content": "<b>Revisa y marca como aceptados tanto el Aviso de privacidad como los Términos y condiciones.</b>",
                                "align": "left",
                                "style": "normal"
                              },
                              {
                                "id": "cols_1793126728461_o1f4u",
                                "type": "columns",
                                "columnsCount": 2,
                                "layout": "equal",
                                "backgroundColor": "white",
                                "columns": [
                                  {
                                    "id": "col_1_1793126728461_ndlmi",
                                    "blocks": [
                                      {
                                        "id": "img_1793126731466_7pwns",
                                        "type": "media",
                                        "mediaType": "image",
                                        "title": "",
                                        "url": "/1793126738795-Captura-de-pantalla-2026-10-27-120814.png",
                                        "caption": "",
                                        "alignment": "center",
                                        "widthPercent": 100
                                      }
                                    ]
                                  },
                                  {
                                    "id": "col_2_1793126728461_vdmc3",
                                    "blocks": [
                                      {
                                        "id": "img_1793126733724_f2x7k",
                                        "type": "media",
                                        "mediaType": "image",
                                        "title": "",
                                        "url": "/1793126743357-Captura-de-pantalla-2026-10-27-120842.png",
                                        "caption": "",
                                        "alignment": "center",
                                        "widthPercent": 100
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "contentData": {
                              "text": "",
                              "imageUrl": "",
                              "videoUrl": "",
                              "layoutBlocks": [
                                {
                                  "id": "txt_1793126695707_um193",
                                  "type": "text",
                                  "title": "",
                                  "content": "<b>Revisa y marca como aceptados tanto el Aviso de privacidad como los Términos y condiciones.</b>",
                                  "align": "left",
                                  "style": "normal"
                                },
                                {
                                  "id": "cols_1793126728461_o1f4u",
                                  "type": "columns",
                                  "columnsCount": 2,
                                  "layout": "equal",
                                  "backgroundColor": "white",
                                  "columns": [
                                    {
                                      "id": "col_1_1793126728461_ndlmi",
                                      "blocks": [
                                        {
                                          "id": "img_1793126731466_7pwns",
                                          "type": "media",
                                          "mediaType": "image",
                                          "title": "",
                                          "url": "/1793126738795-Captura-de-pantalla-2026-10-27-120814.png",
                                          "caption": "",
                                          "alignment": "center",
                                          "widthPercent": 100
                                        }
                                      ]
                                    },
                                    {
                                      "id": "col_2_1793126728461_vdmc3",
                                      "blocks": [
                                        {
                                          "id": "img_1793126733724_f2x7k",
                                          "type": "media",
                                          "mediaType": "image",
                                          "title": "",
                                          "url": "/1793126743357-Captura-de-pantalla-2026-10-27-120842.png",
                                          "caption": "",
                                          "alignment": "center",
                                          "widthPercent": 100
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          }
                        ],
                        "blocks": [
                          {
                            "id": "txt_1793126661111_lvu2i",
                            "type": "text",
                            "title": "",
                            "content": "<b>Escribe y confirma tu teléfono celular y tu correo electrónico, además de indicar tu canal de comunicación preferido.</b>",
                            "align": "left",
                            "style": "normal"
                          },
                          {
                            "id": "img_1793126671203_y4z9e",
                            "type": "media",
                            "mediaType": "image",
                            "title": "",
                            "url": "/1793126683399-Captura-de-pantalla-2026-10-27-120631.png",
                            "caption": "",
                            "alignment": "center",
                            "widthPercent": 100
                          }
                        ],
                        "contentData": {
                          "text": "",
                          "imageUrl": "",
                          "videoUrl": "",
                          "layoutBlocks": [
                            {
                              "id": "txt_1793126661111_lvu2i",
                              "type": "text",
                              "title": "",
                              "content": "<b>Escribe y confirma tu teléfono celular y tu correo electrónico, además de indicar tu canal de comunicación preferido.</b>",
                              "align": "left",
                              "style": "normal"
                            },
                            {
                              "id": "img_1793126671203_y4z9e",
                              "type": "media",
                              "mediaType": "image",
                              "title": "",
                              "url": "/1793126683399-Captura-de-pantalla-2026-10-27-120631.png",
                              "caption": "",
                              "alignment": "center",
                              "widthPercent": 100
                            }
                          ]
                        }
                      }
                    ],
                    "blocks": [
                      {
                        "id": "txt_1793126552911_8mul8",
                        "type": "text",
                        "title": "",
                        "content": "<b>Comprueba que tu nombre registrado sea correcto y presiona \"Sí\".</b>",
                        "align": "left",
                        "style": "normal"
                      },
                      {
                        "id": "img_1793126562792_x9b3a",
                        "type": "media",
                        "mediaType": "image",
                        "title": "",
                        "url": "/1793126566984-Captura-de-pantalla-2026-10-27-120409.png",
                        "caption": "",
                        "alignment": "center",
                        "widthPercent": 100
                      }
                    ],
                    "contentData": {
                      "text": "",
                      "imageUrl": "",
                      "videoUrl": "",
                      "layoutBlocks": [
                        {
                          "id": "txt_1793126552911_8mul8",
                          "type": "text",
                          "title": "",
                          "content": "<b>Comprueba que tu nombre registrado sea correcto y presiona \"Sí\".</b>",
                          "align": "left",
                          "style": "normal"
                        },
                        {
                          "id": "img_1793126562792_x9b3a",
                          "type": "media",
                          "mediaType": "image",
                          "title": "",
                          "url": "/1793126566984-Captura-de-pantalla-2026-10-27-120409.png",
                          "caption": "",
                          "alignment": "center",
                          "widthPercent": 100
                        }
                      ]
                    }
                  }
                ],
                "blocks": [
                  {
                    "id": "txt_1793126501499_dhmy7",
                    "type": "text",
                    "title": "",
                    "content": "<b>Captura tu Número de Seguridad Social (NSS), CURP y RFC.</b>\n",
                    "align": "left",
                    "style": "normal"
                  },
                  {
                    "id": "img_1793126520930_w8w2l",
                    "type": "media",
                    "mediaType": "image",
                    "title": "",
                    "url": "/1793126526985-Captura-de-pantalla-2026-10-27-110018.png",
                    "caption": "",
                    "alignment": "center",
                    "widthPercent": 100
                  }
                ],
                "contentData": {
                  "text": "",
                  "imageUrl": "",
                  "videoUrl": "",
                  "layoutBlocks": [
                    {
                      "id": "txt_1793126501499_dhmy7",
                      "type": "text",
                      "title": "",
                      "content": "<b>Captura tu Número de Seguridad Social (NSS), CURP y RFC.</b>\n",
                      "align": "left",
                      "style": "normal"
                    },
                    {
                      "id": "img_1793126520930_w8w2l",
                      "type": "media",
                      "mediaType": "image",
                      "title": "",
                      "url": "/1793126526985-Captura-de-pantalla-2026-10-27-110018.png",
                      "caption": "",
                      "alignment": "center",
                      "widthPercent": 100
                    }
                  ]
                }
              }
            ],
            "blocks": [
              {
                "id": "txt_1793126185154_23xs1",
                "type": "text",
                "title": "",
                "content": "<b>En el portal de Mi Cuenta Infonavit, selecciona la opción \"Crear una cuenta\".   </b>",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "img_1793126195046_n5c7x",
                "type": "media",
                "mediaType": "image",
                "title": "",
                "url": "/1793126321908-Captura-de-pantalla-2026-10-27-103709.png",
                "caption": "",
                "alignment": "center",
                "widthPercent": 100
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1793126185154_23xs1",
                  "type": "text",
                  "title": "",
                  "content": "<b>En el portal de Mi Cuenta Infonavit, selecciona la opción \"Crear una cuenta\".   </b>",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "img_1793126195046_n5c7x",
                  "type": "media",
                  "mediaType": "image",
                  "title": "",
                  "url": "/1793126321908-Captura-de-pantalla-2026-10-27-103709.png",
                  "caption": "",
                  "alignment": "center",
                  "widthPercent": 100
                }
              ]
            }
          }
        ],
        "blocks": [
          {
            "id": "txt_1793126087905_ah4ww",
            "type": "text",
            "title": "Ten tus datos a la mano",
            "content": "<p><b>Antes de iniciar, asegúrate de contar con los siguientes datos:</b></p><ul><li><p>Número de Seguridad Social (NSS).</p></li><li><p>CURP.</p></li><li><p>RFC.</p></li><li><p>Teléfono celular personal.</p></li><li><p>Correo electrónico personal al que tengas acceso.<br></p></li></ul>",
            "align": "left",
            "style": "normal"
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1793126087905_ah4ww",
              "type": "text",
              "title": "Ten tus datos a la mano",
              "content": "<p><b>Antes de iniciar, asegúrate de contar con los siguientes datos:</b></p><ul><li><p>Número de Seguridad Social (NSS).</p></li><li><p>CURP.</p></li><li><p>RFC.</p></li><li><p>Teléfono celular personal.</p></li><li><p>Correo electrónico personal al que tengas acceso.<br></p></li></ul>",
              "align": "left",
              "style": "normal"
            }
          ]
        }
      },
      {
        "id": "node_1793118703831_4n7h",
        "title": "¿Cómo consultar mi precalificación?",
        "nodeType": "step",
        "children": [
          {
            "id": "node_1793218932786_ihcu",
            "title": "Selecciona “Comprar una Vivienda”.",
            "nodeType": "step",
            "children": [
              {
                "id": "node_1793219005820_pndw",
                "title": "Continúa con la precalificación",
                "nodeType": "step",
                "children": [
                  {
                    "id": "node_1793219049155_u3mb",
                    "title": "Selecciona “Crédito Individual”.",
                    "nodeType": "step",
                    "children": [
                      {
                        "id": "node_1793219073585_6ngn",
                        "title": "Consulta tu precalificación",
                        "nodeType": "step",
                        "children": [
                          {
                            "id": "node_1793219131852_l79m",
                            "title": "Consulta el monto disponible",
                            "nodeType": "step",
                            "children": [],
                            "blocks": [
                              {
                                "id": "txt_1793219406279_15zut",
                                "type": "text",
                                "title": "Consulta el monto disponible",
                                "content": "<b>Al finalizar, podrás visualizar el monto de crédito que tienes disponible para adquirir tu vivienda.</b>",
                                "align": "left",
                                "style": "normal"
                              },
                              {
                                "id": "img_1793223550550_16iwe",
                                "type": "media",
                                "mediaType": "image",
                                "title": "",
                                "url": "/1793223555449-Captura-de-pantalla-2026-10-28-152917.png",
                                "caption": "",
                                "alignment": "center",
                                "widthPercent": 100
                              }
                            ],
                            "contentData": {
                              "text": "",
                              "imageUrl": "",
                              "videoUrl": "",
                              "layoutBlocks": [
                                {
                                  "id": "txt_1793219406279_15zut",
                                  "type": "text",
                                  "title": "Consulta el monto disponible",
                                  "content": "<b>Al finalizar, podrás visualizar el monto de crédito que tienes disponible para adquirir tu vivienda.</b>",
                                  "align": "left",
                                  "style": "normal"
                                },
                                {
                                  "id": "img_1793223550550_16iwe",
                                  "type": "media",
                                  "mediaType": "image",
                                  "title": "",
                                  "url": "/1793223555449-Captura-de-pantalla-2026-10-28-152917.png",
                                  "caption": "",
                                  "alignment": "center",
                                  "widthPercent": 100
                                }
                              ]
                            }
                          }
                        ],
                        "blocks": [
                          {
                            "id": "txt_1793219089688_e88sj",
                            "type": "text",
                            "title": "Consulta tu precalificación",
                            "content": "<b>En la sección correspondiente, selecciona “Crédito Infonavit”.</b>",
                            "align": "left",
                            "style": "normal"
                          },
                          {
                            "id": "img_1793219097101_b0944",
                            "type": "media",
                            "mediaType": "image",
                            "title": "",
                            "url": "/1793223543419-Captura-de-pantalla-2026-10-28-152908.png",
                            "caption": "",
                            "alignment": "center",
                            "widthPercent": 100
                          }
                        ],
                        "contentData": {
                          "text": "",
                          "imageUrl": "",
                          "videoUrl": "",
                          "layoutBlocks": [
                            {
                              "id": "txt_1793219089688_e88sj",
                              "type": "text",
                              "title": "Consulta tu precalificación",
                              "content": "<b>En la sección correspondiente, selecciona “Crédito Infonavit”.</b>",
                              "align": "left",
                              "style": "normal"
                            },
                            {
                              "id": "img_1793219097101_b0944",
                              "type": "media",
                              "mediaType": "image",
                              "title": "",
                              "url": "/1793223543419-Captura-de-pantalla-2026-10-28-152908.png",
                              "caption": "",
                              "alignment": "center",
                              "widthPercent": 100
                            }
                          ]
                        }
                      }
                    ],
                    "blocks": [
                      {
                        "id": "txt_1793219354626_pfpq9",
                        "type": "text",
                        "title": "Selecciona “Crédito Individual”.",
                        "content": "",
                        "align": "left",
                        "style": "normal"
                      },
                      {
                        "id": "img_1793219059660_a5vcp",
                        "type": "media",
                        "mediaType": "image",
                        "title": "",
                        "url": "/1793219065270-tercerpasoCCMP.png",
                        "caption": "",
                        "alignment": "center",
                        "widthPercent": 100
                      }
                    ],
                    "contentData": {
                      "text": "",
                      "imageUrl": "",
                      "videoUrl": "",
                      "layoutBlocks": [
                        {
                          "id": "txt_1793219354626_pfpq9",
                          "type": "text",
                          "title": "Selecciona “Crédito Individual”.",
                          "content": "",
                          "align": "left",
                          "style": "normal"
                        },
                        {
                          "id": "img_1793219059660_a5vcp",
                          "type": "media",
                          "mediaType": "image",
                          "title": "",
                          "url": "/1793219065270-tercerpasoCCMP.png",
                          "caption": "",
                          "alignment": "center",
                          "widthPercent": 100
                        }
                      ]
                    }
                  }
                ],
                "blocks": [
                  {
                    "id": "txt_1793219023256_lhf9t",
                    "type": "text",
                    "title": "Continúa con la precalificación",
                    "content": "<b>Aparecerá un aviso relacionado con tu precalificación. Haz clic en “Continuar”.</b>",
                    "align": "left",
                    "style": "normal"
                  },
                  {
                    "id": "img_1793219033190_yhera",
                    "type": "media",
                    "mediaType": "image",
                    "title": "",
                    "url": "/1793219042749-segundopasoCCMP.png",
                    "caption": "",
                    "alignment": "center",
                    "widthPercent": 100
                  }
                ],
                "contentData": {
                  "text": "",
                  "imageUrl": "",
                  "videoUrl": "",
                  "layoutBlocks": [
                    {
                      "id": "txt_1793219023256_lhf9t",
                      "type": "text",
                      "title": "Continúa con la precalificación",
                      "content": "<b>Aparecerá un aviso relacionado con tu precalificación. Haz clic en “Continuar”.</b>",
                      "align": "left",
                      "style": "normal"
                    },
                    {
                      "id": "img_1793219033190_yhera",
                      "type": "media",
                      "mediaType": "image",
                      "title": "",
                      "url": "/1793219042749-segundopasoCCMP.png",
                      "caption": "",
                      "alignment": "center",
                      "widthPercent": 100
                    }
                  ]
                }
              }
            ],
            "blocks": [
              {
                "id": "txt_1793219294920_mgp2b",
                "type": "text",
                "title": "Selecciona “Comprar una Vivienda”.",
                "content": "",
                "align": "left",
                "style": "normal"
              },
              {
                "id": "img_1793218949708_8mqva",
                "type": "media",
                "mediaType": "image",
                "title": "",
                "url": "/1793218989607-primerpasoCCMP.png",
                "caption": "",
                "alignment": "center",
                "widthPercent": 100
              }
            ],
            "contentData": {
              "text": "",
              "imageUrl": "",
              "videoUrl": "",
              "layoutBlocks": [
                {
                  "id": "txt_1793219294920_mgp2b",
                  "type": "text",
                  "title": "Selecciona “Comprar una Vivienda”.",
                  "content": "",
                  "align": "left",
                  "style": "normal"
                },
                {
                  "id": "img_1793218949708_8mqva",
                  "type": "media",
                  "mediaType": "image",
                  "title": "",
                  "url": "/1793218989607-primerpasoCCMP.png",
                  "caption": "",
                  "alignment": "center",
                  "widthPercent": 100
                }
              ]
            }
          }
        ],
        "blocks": [
          {
            "id": "txt_1793218640943_57yt6",
            "type": "text",
            "title": "Ingresa a Mi Cuenta Infonavit",
            "content": "Captura tu Número de Seguridad Social (NSS) y tu contraseña.",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "img_1793218663747_rfoaj",
            "type": "media",
            "mediaType": "image",
            "title": "",
            "url": "/1793218916806-Captura-de-pantalla-2026-10-28-122654.png",
            "caption": "",
            "alignment": "center",
            "widthPercent": 100
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1793218640943_57yt6",
              "type": "text",
              "title": "Ingresa a Mi Cuenta Infonavit",
              "content": "Captura tu Número de Seguridad Social (NSS) y tu contraseña.",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "img_1793218663747_rfoaj",
              "type": "media",
              "mediaType": "image",
              "title": "",
              "url": "/1793218916806-Captura-de-pantalla-2026-10-28-122654.png",
              "caption": "",
              "alignment": "center",
              "widthPercent": 100
            }
          ]
        }
      }
    ],
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "layoutBlocks": []
  },
  {
    "id": "incapacidades",
    "title": "IMSS",
    "iconName": "Stethoscope",
    "icon": "Stethoscope",
    "shortDesc": "Tipos de incapacidad, documentación requerida del IMSS y proceso para reportarla.",
    "category": "Asistencia y Vacaciones",
    "fullDescription": "Tipos de incapacidad, documentación requerida del IMSS y proceso para reportarla.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "decisionTree": [
      {
        "id": "node_root_1",
        "title": " ¿Cómo dar de alta a tus beneficiarios en tu clínica del IMSS?",
        "nodeType": "content",
        "blocks": [
          {
            "id": "txt_1793223743498_y2phh",
            "type": "text",
            "title": "¿Qué necesitas?",
            "content": "<p>Tu NSS (Número de Seguridad Social).</p>Tu CURP y la CURP de cada familiar.<br>Un correo electrónico personal.\n",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "txt_1793225688721_iyhcg",
            "type": "text",
            "title": "Documentos por familiar",
            "content": "<ul><li><b>Esposa/o:</b> identificación oficial, foto tamaño infantil y acta de matrimonio.</li><li><b>Hijos:</b> acta de nacimiento, adopción o reconocimiento y foto tamaño infantil.</li><li><b>Mamá o papá:</b> identificación, tu acta de nacimiento, comprobante de domicilio, foto tamaño infantil y manifestación de convivencia y dependencia económica.</li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "txt_1793224006547_gihng",
            "type": "text",
            "title": "",
            "content": "Acude a la UMF que te corresponde, al área de Afiliación/Vigencia de Derechos, llevando los documentos originales y copias. <b>El trámite es gratuito.</b><br>",
            "align": "left",
            "style": "normal"
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1793223743498_y2phh",
              "type": "text",
              "title": "¿Qué necesitas?",
              "content": "<p>Tu NSS (Número de Seguridad Social).</p>Tu CURP y la CURP de cada familiar.<br>Un correo electrónico personal.\n",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "txt_1793225688721_iyhcg",
              "type": "text",
              "title": "Documentos por familiar",
              "content": "<ul><li><b>Esposa/o:</b> identificación oficial, foto tamaño infantil y acta de matrimonio.</li><li><b>Hijos:</b> acta de nacimiento, adopción o reconocimiento y foto tamaño infantil.</li><li><b>Mamá o papá:</b> identificación, tu acta de nacimiento, comprobante de domicilio, foto tamaño infantil y manifestación de convivencia y dependencia económica.</li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "txt_1793224006547_gihng",
              "type": "text",
              "title": "",
              "content": "Acude a la UMF que te corresponde, al área de Afiliación/Vigencia de Derechos, llevando los documentos originales y copias. <b>El trámite es gratuito.</b><br>",
              "align": "left",
              "style": "normal"
            }
          ]
        }
      },
      {
        "id": "node_1793046417290_f4yq",
        "title": "Incapacidades",
        "nodeType": "content",
        "blocks": [
          {
            "id": "txt_1793224381136_dkh3z",
            "type": "text",
            "title": "Porcentaje y fecha de pago:",
            "content": "<ul data-spread=\"false\" data-pm-slice=\"3 3 []\"><li><p><strong>Enfermedad general:</strong> 60% del salario base de cotización (SBC), a partir del 4.º día.</p></li><li><p><strong>Riesgo de trabajo:</strong> 100% del SBC, desde el primer día.</p></li><li><p><strong>Maternidad:</strong> 100% del SBC durante la licencia de 84 días.<br></p></li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "txt_1793224676385_iba2i",
            "type": "text",
            "title": "Documentos necesarios:",
            "content": "<ul><li>Copia para el asegurado del certificado de incapacidad del IMSS.</li><li>Identificación oficial vigente con fotografía (INE o pasaporte).</li><li>Número de Seguridad Social (NSS).<br></li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "txt_1793224528077_nawsm",
            "type": "text",
            "title": "¿Dónde cobrar?",
            "content": "<p data-pm-slice=\"1 1 []\">Puedes acudir a cualquiera de los siguientes bancos:</p><ul><li>BBVA</li><li>Banorte</li><li>HSBC</li><li>Santander</li><li>Banamex</li><li>Scotiabank</li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "alt_1793224513634_zoksv",
            "type": "alert",
            "level": "warning",
            "title": "Aviso Importante",
            "message": "Deberás acudir personalmente a la ventanilla bancaria para gestionar el cobro de tu incapacidad.\n"
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1793224381136_dkh3z",
              "type": "text",
              "title": "Porcentaje y fecha de pago:",
              "content": "<ul data-spread=\"false\" data-pm-slice=\"3 3 []\"><li><p><strong>Enfermedad general:</strong> 60% del salario base de cotización (SBC), a partir del 4.º día.</p></li><li><p><strong>Riesgo de trabajo:</strong> 100% del SBC, desde el primer día.</p></li><li><p><strong>Maternidad:</strong> 100% del SBC durante la licencia de 84 días.<br></p></li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "txt_1793224676385_iba2i",
              "type": "text",
              "title": "Documentos necesarios:",
              "content": "<ul><li>Copia para el asegurado del certificado de incapacidad del IMSS.</li><li>Identificación oficial vigente con fotografía (INE o pasaporte).</li><li>Número de Seguridad Social (NSS).<br></li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "txt_1793224528077_nawsm",
              "type": "text",
              "title": "¿Dónde cobrar?",
              "content": "<p data-pm-slice=\"1 1 []\">Puedes acudir a cualquiera de los siguientes bancos:</p><ul><li>BBVA</li><li>Banorte</li><li>HSBC</li><li>Santander</li><li>Banamex</li><li>Scotiabank</li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "alt_1793224513634_zoksv",
              "type": "alert",
              "level": "warning",
              "title": "Aviso Importante",
              "message": "Deberás acudir personalmente a la ventanilla bancaria para gestionar el cobro de tu incapacidad.\n"
            }
          ]
        }
      }
    ],
    "tags": [
      "incapacidad",
      "imss",
      "médico",
      "enfermedad",
      "accidente",
      "maternidad",
      "riesgo de trabajo",
      "st-7",
      "subsidio",
      "constancia"
    ],
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "layoutBlocks": [],
    "hidden": false
  },
  {
    "id": "custom_1793134000134",
    "title": "INFONACOT",
    "iconName": "Banknote",
    "shortDesc": "",
    "category": "Nómina y Pagos",
    "fullDescription": "",
    "steps": [],
    "requirements": [],
    "location": "",
    "schedule": "",
    "contact": "",
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "attachments": [],
    "alertNotice": "",
    "decisionTree": [],
    "layoutBlocks": [],
    "hidden": true,
    "icon": "Banknote"
  },
  {
    "id": "reloj_checador",
    "title": "Checador y Asistencia",
    "iconName": "Fingerprint",
    "icon": "Fingerprint",
    "shortDesc": "Guía de uso de lectores en planta, política sobre omisión de marcas y aclaraciones de asistencia.",
    "category": "Asistencia y Vacaciones",
    "fullDescription": "Guía de uso de lectores en planta, política sobre omisión de marcas y aclaraciones de asistencia.",
    "steps": [],
    "requirements": [],
    "faqs": [],
    "imageUrl": "",
    "videoUrl": "",
    "pdfUrl": "",
    "pdfTitle": "",
    "tags": [
      "checador",
      "asistencia",
      "reloj",
      "lector",
      "huella",
      "gafete",
      "retardo",
      "omisión",
      "incidencia",
      "marcas",
      "horario"
    ],
    "decisionTree": [
      {
        "id": "node_root_1",
        "title": "Mi huella no registra",
        "nodeType": "content",
        "blocks": [
          {
            "id": "txt_1792691012666_qfmod",
            "type": "text",
            "title": "¿El reloj checador no reconoce tu huella en tu área de trabajo o en el comedor?",
            "content": "<p><b>¿Qué debes hacer?</b></p><p></p><ul><li><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para recibir apoyo con tu registro de asistencia.</li></ul><br><p><b>¿Qué información necesitas?</b></p><ul><li>Nombre completo.</li><li>Número de nómina.<br></li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "txt_1792701792477_twhnr",
            "type": "text",
            "title": "Horario de atención:",
            "content": "Lunes - Viernes: 7:00 am a 8:00 am | 9:00 am a 12:00 pm | 2:30 pm a 3:30 pm\nSábados: 9:30 am a 12:30 pm\n",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "alt_1792691224731_yykrh",
            "type": "alert",
            "level": "warning",
            "title": "Aviso Importante",
            "message": "Reporta el problema lo antes posible. Una falla en el registro de tu huella puede generar incidencias en tu asistencia y, según el caso, afectar tu pago."
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1792691012666_qfmod",
              "type": "text",
              "title": "¿El reloj checador no reconoce tu huella en tu área de trabajo o en el comedor?",
              "content": "<p><b>¿Qué debes hacer?</b></p><p></p><ul><li><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para recibir apoyo con tu registro de asistencia.</li></ul><br><p><b>¿Qué información necesitas?</b></p><ul><li>Nombre completo.</li><li>Número de nómina.<br></li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "txt_1792701792477_twhnr",
              "type": "text",
              "title": "Horario de atención:",
              "content": "Lunes - Viernes: 7:00 am a 8:00 am | 9:00 am a 12:00 pm | 2:30 pm a 3:30 pm\nSábados: 9:30 am a 12:30 pm\n",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "alt_1792691224731_yykrh",
              "type": "alert",
              "level": "warning",
              "title": "Aviso Importante",
              "message": "Reporta el problema lo antes posible. Una falla en el registro de tu huella puede generar incidencias en tu asistencia y, según el caso, afectar tu pago."
            }
          ]
        }
      },
      {
        "id": "node_1792690440155_7pl0",
        "title": "El reloj checador no funciona",
        "nodeType": "content",
        "blocks": [
          {
            "id": "txt_1792694613901_lk8y2",
            "type": "text",
            "title": "¿El reloj checador está apagado, muestra un error o no responde cuando intentas registrar tu asistencia?",
            "content": "<p><b>¿Qué debes hacer?</b></p><p><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para reportar la falla y recibir orientación.</p><p></p><p><br></p><p><b>¿Qué información conviene proporcionar?</b></p><ul><li><p>Nombre completo.</p></li><li><p>Número de nómina.</p></li><li><p>Área donde se encuentra el reloj.</p></li><li><p>Qué sucede cuando intentas utilizarlo.<br></p></li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "alt_1792694643381_fw0zn",
            "type": "alert",
            "level": "warning",
            "title": "Aviso Importante",
            "message": "Si no puedes registrar tu asistencia debido a una falla del equipo, repórtala lo antes posible para que puedan revisar tu situación y evitar posibles incidencias en tu registro."
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1792694613901_lk8y2",
              "type": "text",
              "title": "¿El reloj checador está apagado, muestra un error o no responde cuando intentas registrar tu asistencia?",
              "content": "<p><b>¿Qué debes hacer?</b></p><p><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para reportar la falla y recibir orientación.</p><p></p><p><br></p><p><b>¿Qué información conviene proporcionar?</b></p><ul><li><p>Nombre completo.</p></li><li><p>Número de nómina.</p></li><li><p>Área donde se encuentra el reloj.</p></li><li><p>Qué sucede cuando intentas utilizarlo.<br></p></li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "alt_1792694643381_fw0zn",
              "type": "alert",
              "level": "warning",
              "title": "Aviso Importante",
              "message": "Si no puedes registrar tu asistencia debido a una falla del equipo, repórtala lo antes posible para que puedan revisar tu situación y evitar posibles incidencias en tu registro."
            }
          ]
        }
      },
      {
        "id": "node_1792690460204_uge1",
        "title": "Mi marcación no aparece",
        "nodeType": "content",
        "blocks": [
          {
            "id": "txt_1792694677433_qlrhj",
            "type": "text",
            "title": "¿Registraste tu entrada o salida en el reloj checador, pero no aparece en tu registro de asistencia?",
            "content": "<p><b>¿Qué debes hacer?</b></p><p><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para solicitar una revisión de tu registro.</p><p><br></p><p></p><p><b>¿Qué información conviene tener a la mano?</b></p><ul><li><p>Nombre completo.</p></li><li><p>Número de nómina.</p></li><li><p>Fecha en la que realizaste la marcación.</p></li><li><p>Hora aproximada y ubicación del reloj.</p></li><li><p>Si se trató de una entrada o una salida.<br></p></li></ul>",
            "align": "left",
            "style": "normal"
          },
          {
            "id": "alt_1792694720717_ohtc3",
            "type": "alert",
            "level": "warning",
            "title": "Aviso Importante",
            "message": "Reporta la marcación faltante lo antes posible para que puedan revisar tu caso y determinar si existe una incidencia en tu asistencia."
          }
        ],
        "contentData": {
          "text": "",
          "imageUrl": "",
          "videoUrl": "",
          "layoutBlocks": [
            {
              "id": "txt_1792694677433_qlrhj",
              "type": "text",
              "title": "¿Registraste tu entrada o salida en el reloj checador, pero no aparece en tu registro de asistencia?",
              "content": "<p><b>¿Qué debes hacer?</b></p><p><b>Acude al Módulo de Servicio al Personal</b>, ubicado a un costado de Ropería, para solicitar una revisión de tu registro.</p><p><br></p><p></p><p><b>¿Qué información conviene tener a la mano?</b></p><ul><li><p>Nombre completo.</p></li><li><p>Número de nómina.</p></li><li><p>Fecha en la que realizaste la marcación.</p></li><li><p>Hora aproximada y ubicación del reloj.</p></li><li><p>Si se trató de una entrada o una salida.<br></p></li></ul>",
              "align": "left",
              "style": "normal"
            },
            {
              "id": "alt_1792694720717_ohtc3",
              "type": "alert",
              "level": "warning",
              "title": "Aviso Importante",
              "message": "Reporta la marcación faltante lo antes posible para que puedan revisar tu caso y determinar si existe una incidencia en tu asistencia."
            }
          ]
        }
      }
    ],
    "location": "",
    "schedule": "",
    "contact": "",
    "attachments": [],
    "alertNotice": "",
    "layoutBlocks": []
  }
];

export const allServices: Service[] = initialServices;
export const servicesData = initialServices;

export const initialNews: NewsItem[] = [
  {
    "id": "news_1788467824316",
    "title": "¡Próximamente: Descubre tu nuevo Portal de Talento y Cultura!",
    "summary": "Muy pronto tendrás todos tus trámites, consultas y tutoriales de Recursos Humanos al alcance de tu celular, sin necesidad de hacer filas. ¡Espéralo!",
    "content": "Estimado equipo,\n\nEn Talento y Cultura seguimos innovando para hacerte la vida más fácil. Nos emociona anunciar que estamos afinando los últimos detalles para el gran lanzamiento de nuestro nuevo Portal Digital de Servicios al Personal.\n\nSabemos que tu tiempo es valioso, por lo que hemos diseñado una plataforma completamente nueva, pensada para usarse de forma rápida y sencilla desde cualquier teléfono celular.\n\n¿Qué podrás encontrar en este nuevo portal?\n\nTrámites en un clic: Información clara sobre vacaciones, préstamos, control de asistencia y dudas de pago.\n\nTutoriales paso a paso: Guías visuales para que sepas exactamente cómo registrar tus tarjetas o usar las aplicaciones oficiales.\n\nAtención directa: Acceso directo a nuestro WhatsApp oficial, horarios actualizados y un croquis para ubicar nuestra ventanilla rápidamente.\n\nNuestro objetivo es que tengas la información de la empresa disponible las 24 horas del día, los 7 días de la semana, evitándote vueltas innecesarias a la oficina.\n\n¡Mantente atento a nuestros próximos comunicados! Muy pronto te compartiremos el enlace oficial y las instrucciones de acceso para que seas de los primeros en probarlo.\n\nTalento y Cultura",
    "date": "15/10/2026",
    "imageName": "welcome_team",
    "category": "comunicado"
  }
];
export const newsData = initialNews;

export const avisosData: Aviso[] = [];

export function getDefaultServiceDetails(service: Service) {
  return {
    fullDescription: service.fullDescription || service.shortDesc || '',
    steps: service.steps || [],
    requirements: service.requirements || [],
    location: service.location || '',
    schedule: service.schedule || '',
    contact: service.contact || '',
    faqs: service.faqs || [],
    imageUrl: service.imageUrl || '',
    videoUrl: service.videoUrl || '',
    pdfUrl: service.pdfUrl || '',
    pdfTitle: service.pdfTitle || '',
    attachments: service.attachments || [],
    alertNotice: service.alertNotice || '',
    decisionTree: service.decisionTree || []
  };
}

export const faqsData: FAQ[] = [];
