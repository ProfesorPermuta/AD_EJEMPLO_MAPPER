package com.permuta.ejemplo_mapper.djinn.dto;

import com.permuta.ejemplo_mapper.djinn.model.Element;
import com.permuta.ejemplo_mapper.djinn.model.DjinnState;
import com.permuta.ejemplo_mapper.djinn.model.Game;

public record DjinnResponse(
        Long id,
        String name,
        Element element,
        Game game,
        String location,
        String effect,
        int summonPower,
        DjinnState state,
        String displayName) {
}
