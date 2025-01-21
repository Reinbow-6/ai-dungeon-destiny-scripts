const modifier = (text) => {
    state.inventory = state.inventory || [];

    const addItem = (item) => {
        if (!state.inventory.includes(item)) {
            state.inventory.push(item);
            state.message += `Has añadido ${item} a tu inventario.\n`;
        } else {
            state.message += `Ya tienes ${item} en tu inventario.\n`;
        }
    };

    const removeItem = (item) => {
        const index = state.inventory.indexOf(item);
        if (index > -1) {
            state.inventory.splice(index, 1);
            state.message += `Has eliminado ${item} de tu inventario.\n`;
        } else {
            state.message += `No tienes ${item} en tu inventario.\n`;
        }
    };

    // Analizar la entrada del usuario
    const addMatch = text.match(/\n?> Guardar (.+?)\.?\n?$/i); // Busca "Guardar [objeto]"
    if (addMatch) {
        addItem(addMatch[1].trim());
        return { text: "", stop: true };
    }

    const showInventoryMatch = text.match(/\n?> Revisar inventario\.?\n?$/i); // Busca "Revisar inventario"
    if (showInventoryMatch) {
        if (state.inventory.length === 0) {
            state.message += "Tu inventario está vacío.\n";
        } else {
            state.message += "Inventario: " + state.inventory.join(", ") + "\n";
        }
        return { text: "", stop: true };
    }

    const useMatch = text.match(/\n?> Usar (.+?) (?:en|con|para) (.+?)\.?\n?$/i); // Busca "Usar [objeto] (en/con/para) [objetivo]"
    if (useMatch) {
        const itemToUse = useMatch[1].trim();
        const target = useMatch[2].trim();
        if (state.inventory.includes(itemToUse)) {
            return { text: `Usas ${itemToUse} en ${target}.\nEl jugador está usando ${itemToUse} en ${target}.\n`, stop: true };
        } else {
            state.message = `No tienes ${itemToUse} en tu inventario.\n`;
            return { text: "", stop: true };
        }
    }

    // Analizar las acciones de la IA
    const iaGiveMatch = text.match(/^(.*) te da (.+?)\.?\n?$/i);
    if (iaGiveMatch) {
        addItem(iaGiveMatch[2].trim());
        return { text: iaGiveMatch[1] + " te da " + iaGiveMatch[2] + ".\n", stop: true};
    }

    const iaTakeMatch = text.match(/^(.*) te quita (.+?) de ti\.?\n?$/i);
    if (iaTakeMatch) {
        removeItem(iaTakeMatch[2].trim());
        return { text: iaTakeMatch[1] + " te quita " + iaTakeMatch[2] + ".\n", stop: true };
    }

    //Modificar el contexto para la IA
    let context = text;
    if(state.inventory.length > 0){
        context += `\nTu inventario contiene: ${state.inventory.join(", ")}.`;
    }

    delete state.message;
    return { text: context };
};

modifier(text);