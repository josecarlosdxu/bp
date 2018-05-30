var tooltips = {

    tooltip_2mb: {
        url: null,
        modifier: 'top',
        message: 'El tamaño máximo de cada archivo no debe superar los 2Mb. No valen fotos de vista previa de eBay o marketplace. Las fotos deben ser claramente legibles. Con esta infomación valoraremos la rotura y se optara por abonar, reenviar o rechazar la incidencia'
    },

    tooltip_golpes: {
        url: null,
        modifier: 'top',
        message: 'Fotografía del embalaje exterior (si hay marcas de golpes haga hincapié en ellas)'
    },
    tooltip_abierta: {
        url: null,
        modifier: 'top',
        message: 'Fotografía de la caja abierta, con el producto dentro, donde se observen las protecciones y disposición del mismo dentro de la caja, blíster, etc…)'

    },
     tooltip_producto_unidad: {
        url: null,
        modifier: 'top',
        message: 'Fotografía de la unidad afectada (donde se observen los posibles defectos de la unidad)'

    },
    tooltip_etiqueta: {
        url: null,
        modifier: 'top',
        message: 'Fotografía de la etiqueta adherida de la mensajería sobre la caja, bolsa, sobre etc…'
    },
    tooltip_albaran: {
        url: null,
        modifier: 'top',
        message: 'Escaneo o fotografía del albarán de mercancía recibido dentro del paquete donde aparecen los cuños de tinta estampados de nuestros preparadores y revisores…'
    },
    tooltip_paypal: {
        url: null,
        modifier: 'top',
        message: 'PayPal es la forma más rápida y segura de pagar por internet. Puede abonar sus compras fácilmente y con total confianza con tarjeta de débito o crédito o con su cuenta bancaria a través de PayPal. <a style="color:#fff" target="_blank" href="https://www.paypal.com/es/webapps/mpp/paypal-popup">+ info</a>'
    },

    tooltip_sofort: {
        url: null,
        modifier: 'top',
        message:'Con esta forma de pago recibimos una confirmación instantánea de su transferencia. De este modo podremos enviarle su pedido antes que con la transferencia convencional. SOFORT Banking es totalmente seguro, fácil de usar y compatible con la mayoría de bancos. Sólo necesita usar sus datos habituales de la banca online.'
    },
    tooltip_transport: {
        url: null,
        modifier: 'bottomLeft',
        message: '1 producto/s exceden las medidas máximas del transportista.  <a style="color:#fff" target="_blank" href="https://www.bigbuy.eu">Ver productos</a>'
    },

    tooltip_braintree: {
        url: null,
        modifier: 'top',
        message: '<img class="icon--braintreelogo" src="../../img/braintree_white.svg"/>Braintree es una pasarela que acepta multitud de formas de pago. Es una compañía que pertenece a PayPal. Acepta todo tipo de tarjetas, y próximamente aceptará pagos por Android Pay, Apple Pay y Bitcoin.'
    },
    tooltip_followup_info: {
        url: null,
        modifier: 'top',
        messagge: 'Seguimiento de stock'
    },
     tooltip_shop_name: {
        url: null,
        modifier: 'top',
        message: 'Texto del tooltip'
    },


    tooltip_productsheet_range: {
        url: null,
        modifier: 'bottom',
        message: 'Para alcanzar el siguiente rango de descuento automático deberá añadir al carrito más artículos de valor igual o superior al importe aquí indicado.'
    },

    tooltip_productsheet_pack: {
        url: null,
        modifier: 'bottom',
        message: 'Los clientes con Pack Mayorista Basic, Pro, Business o Premium activo se benefician de la compra de unidades sueltas a precio P. V. D. (precio de venta al distribuidor) e incluso descuentos adicionales sobre este P. V. D.'
    },

    tooltip_captcha: {
        url: null,
        modifier: 'top',
        message: 'Esta es una medida de seguridad para evitar spam en nuestros sistemas. Por favor, introduzca los números de la izquierda.'
    },

    tooltip_passwd_create: {
        url: null,
        modifier: 'topLeft',
        message: 'Introduzca una contraseña que pueda recordar, la necesitará cada vez que inicie sesión en BigBuy.'
    },
    tooltip1: {
        url: '../../views/front/partials/tooltip.html',
        modifier: 'bottom'
    },
    tooltip2: {
        url: '../../views/front/partials/tooltip2.html',
        modifier: 'top'
    },
    tooltip_particulartop: {
        url: null,
        modifier: 'top',
        message: '<strong>Particular</strong><p class="u-pdt--half">Por favor, introduzca su Número de Identificación Fiscal, u otro número que permita identificarle, como su DNI o pasaporte.</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
    tooltip_particular: {
        url: null,
        modifier: 'topRight',
        message: '<strong>Particular</strong><p class="u-pdt--half">Por favor, introduzca su Número de Identificación Fiscal, u otro número que permita identificarle, como su DNI o pasaporte.</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
     tooltip_autonomotop: {
        url: null,
        modifier: 'top',
        message: '<strong>Autónomo</strong><p class="u-pdt--half">Por favor, introduzca su Número de Identificación Fiscal. [en idiomas: o el código que corresponda en su país para declarar su actividad comercial o ingresos personales].</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
     tooltip_autonomo: {
        url: null,
        modifier: 'topRight',
        message: '<strong>Autónomo</strong><p class="u-pdt--half">Por favor, introduzca su Número de Identificación Fiscal. [en idiomas: o el código que corresponda en su país para declarar su actividad comercial o ingresos personales].</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
     tooltip_empresatop: {
        url: null,
        modifier: 'top',
        optionalClasses: 'u-xs-35 u-lg-20',
        message: '<strong>Empresa</strong><p class="u-pdt--half">Por favor, introduzca el Número de Identificación Fiscal o el número de IVA intracomunitario de su empresa.</p><p class="u-pdt--half">Si su empresa reside en un país de la UE (distinto de España) y dispone de un número de IVA intracomunitario válido, no tendrá que pagar IVA para las compras con destino fuera de España.</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
     tooltip_empresa: {
        url: null,
        modifier: 'topRight',
        message: '<strong>Empresa</strong><p class="u-pdt--half">Por favor, introduzca el Número de Identificación Fiscal o el número de IVA intracomunitario de su empresa.</p><p class="u-pdt--half">Si su empresa reside en un país de la UE (distinto de España) y dispone de un número de IVA intracomunitario válido, no tendrá que pagar IVA para las compras con destino fuera de España.</p><p class="u-pdt--half">La información introducida en este campo aparecerá en las facturas que le emitamos.</p>'
    },
    
    tooltip3: {
        url: null,
        modifier: 'top',
        message: 'Mensaje de prueba',
        optionalClasses: 'u-xs-10'
    },
    tooltip_SKU: {
        url: null,
        modifier: 'bottomLeft',
        message: 'Código BigBuy',
        optionalClasses: 'u-xs-10'
    },
     tooltip_unico: {
        url: null,
        modifier: 'bottomLeft',
        message: 'Envío único',
        optionalClasses: 'u-xs-10'
    },

    tooltip_plazo: {
        url: null,
        modifier: 'bottomLeft',
        message: 'Plazo preparación',
        optionalClasses: 'u-xs-10'
    },
    tooltip_PVR: {
        url: null,
        modifier: 'bottomLeft',
        message: 'Precio de venta recomendado',
        optionalClasses: 'u-xs-10'
    },
    tooltip_Volumen: {
        url: null,
        modifier: 'bottomLeft',
        message: 'Descuento por volumen',
        optionalClasses: 'u-xs-10'
    },
    tooltipNews: {
        url: null,
        modifier: 'top',
        message: 'En caso de que BigBuy no pueda enviarle Newsletters en su idioma, por defecto se mandarían en inglés.',
        optionalClasses: 'u-xs-20 u-mgl--3rd'
    },
    tooltipUserLangPro: {
        url: null,
        modifier: 'top',
        message: ' Con el Pack Pro solo tiene 1 idioma disponible para sincronizar la Tienda Dropshipping que ofrece BigBuy o para descargar archivos CSV/XML.',
        optionalClasses: 'u-xs-20 u-mgl--3rd'
    },

    tooltip_descuento_auto: {
        url: null,
        modifier: 'top',
        message: 'Se puede alcanzar un descuento adicional de hasta el 6% respecto al PVD. Se aplica de forma automática en función del total del carrito de la compra.',
        optionalClasses: 'u-xs-15'
    },
    tooltip_envioDropshipping: {
        url: null,
        modifier: 'top',
        message: 'Envío desde BigBuy con remitente anónimo directo a su cliente, con cajas sin publicidad y albarán neutro sin precios.',
        optionalClasses: 'u-xs-15'
    },

    tooltip_RD: {
        url: null,
        modifier: 'top',
        message: 'Reembolso Dropshipping',
        optionalClasses: 'u-xs-10'
    },
    PVDToolTip: {
        url: null,
        modifier: 'top',
        message: 'Precio Venta Distribuidor',
        optionalClasses: 'u-xs-10'
    },
    PVRToolTip: {
        url: null,
        modifier: 'top',
        message: 'Precio Venta Recomendado',
        optionalClasses: 'u-xs-10'
    },
    tooltip_address: {
        url: null,
        modifier: 'bottom',
        message: 'Si observa algún dato incorrecto en los datos de facturación, escriba un e-mail a admin@bigbuy.eu e indíquenos la incidencia. Estos datos solo los puede modificar nuestro departamento de administración, dado que nuestro ciclo de facturación se realiza cada 10 días y se deben aglutinar todos los pedidos realizados en una misma factura. <br><br> Si lo que necesita es disponer de dos direcciones de facturación diferentes, deberá crear otra cuenta en BigBuy.',
        optionalClasses: 'u-xs-20'
    },
    tooltip_dropshipping_back: {
        url: null,
        modifier: 'top',
        message: 'Indique el nombre de su sitio web o empresa para que aparezca impreso bajo el logotipo en los albaranes con envío dropshipping.',
        optionalClasses: 'u-xs-10'
    },
    tooltip_dropshipping_avatar: {
        url: null,
        modifier: 'top',
        message: 'Añada su imagen de empresa o sitio web. <br>MUY IMPORTANTE: esta imagen o logotipo será visible en el albarán de los envíos dropshipping para que su cliente le identifique como remitente.',
        optionalClasses: 'u-xs-20'
    }
};
