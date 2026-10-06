package com.permuta.ejemplo_mapper.djinn.mapper;

import com.permuta.ejemplo_mapper.djinn.dto.NewDjinnRequest;
import com.permuta.ejemplo_mapper.djinn.dto.DjinnResponse;
import com.permuta.ejemplo_mapper.djinn.model.Djinn;
import com.permuta.ejemplo_mapper.djinn.model.DjinnState;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DjinnMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "state", source = "state")
    @Mapping(target = "createdAt", source = "createdAt")
    Djinn toEntity(NewDjinnRequest request, DjinnState state, LocalDateTime createdAt);

    @Mapping(target = "displayName", expression = "java(djinn.getName() + \" (\" + djinn.getElement() + \")\")")
    DjinnResponse toResponse(Djinn djinn);

    List<DjinnResponse> toResponseList(List<Djinn> djinns);
}
