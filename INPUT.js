const modifier = (text) => {
    // Inicialización
    state.currentAct = state.currentAct || 1;
    state.currentMission = state.currentMission || null;
    state.chosenFaction = state.chosenFaction || null;
    state.players = state.players || {};
    let context = text;
    let message = "";

    // --- MANEJO DE NUEVOS JUGADORES ---
    const newPlayerMatch = text.match(/\n?>New player (.+?) (.+?)\.?\n?$/i);
    if (newPlayerMatch) {
        const playerName = newPlayerMatch[1].trim();
        const playerDescription = newPlayerMatch[2].trim();

        if (!state.players[playerName]) {
            state.players[playerName] = { description: playerDescription };
            message += `Se ha unido ${playerName} (${playerDescription}).\n`;
            context += `\n${playerName} se ha unido al grupo. ${playerDescription}\n`;
        } else {
            message += `Ya hay un jugador con el nombre ${playerName}. Por favor, elige otro nombre.\n`;
        }
        return { text: "", stop: true };
    }

    // --- MANEJO DE ACCIONES DE JUGADORES ---
    const playerActionMatch = Object.keys(state.players).some(playerName => {
        const regex = new RegExp(`\n?>${playerName} (.+?)\.?\n?$`, "i");
        const actionMatch = text.match(regex);
        if (actionMatch) {
            const playerAction = actionMatch[1].trim();
            context += `\n${playerName} ${playerAction}.\n`;
            return true;
        }
        return false;
    });

    if (playerActionMatch) {
        return { text: "", stop: true };
    }


    // --- MANEJO DE MISIONES (ACTO 1) ---
    const setMission = (missionText) => {
        state.currentMission = missionText;
        context += `\nTu misión actual es: ${missionText}.\n`;
    };

    if (state.currentAct === 1) {
        if (!state.currentMission) {
            setMission("Investigar las extrañas señales de energía provenientes de la Red Vex y enviar 'informe de Nessus a la Vanguardia'");
        }

        if (text.includes("informe de Nessus a la Vanguardia")) {
            setMission("Investigar los ataques de los Scorn en el Arrecife y enviar 'informe del Arrecife a la Vanguardia'");
        }
        if (text.includes("informe del Arrecife a la Vanguardia")) {
            setMission("Investigar la actividad de la Colmena y enviar 'informe de la Tierra a la Vanguardia'");
        }
        if (text.includes("informe de la Tierra a la Vanguardia")) {
            state.currentAct = 2;
            state.currentMission = null;
            context += "\nHas completado el Acto 1. Adelante deberás elegir un equipo al cual apoyar.\n";
        }
    }

    // --- MANEJO DE LA ELECCIÓN DE FACCIÓN (ACTO 2) ---
    const setFaction = (faction) => {
        state.chosenFaction = faction;
        context += `\nHas elegido apoyar a ${faction}.\n`;
    };

    if (state.currentAct === 2) {
        if (text.includes("Apoyar a Ikora")) {
            setFaction("Ikora");
            state.currentAct = 3;
            context += "\nHas completado el Acto 2. Te diriges al Acorazado.\n";
        }
        if (text.includes("Apoyar a Cuervo")) {
            setFaction("Cuervo");
            state.currentAct = 3;
            context += "\nHas completado el Acto 2. Te diriges al Acorazado.\n";
        }
        if (text.includes("Apoyar a Zavala")) {
            setFaction("Zavala");
            state.currentAct = 3;
            context += "\nHas completado el Acto 2. Te diriges al Acorazado.\n";
        }
    }

    // --- REFERENCIA A LA FACCIÓN ELEGIDA (ACTO 3) ---
    if (state.currentAct === 3 && state.chosenFaction) {
        context += `\nRecuerdas tu decisión de apoyar a ${state.chosenFaction}.\n`;
    }

    return { text: context };
};

modifier(text);